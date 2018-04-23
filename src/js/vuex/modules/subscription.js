import axios from 'axios';
import {subscriptionMachine} from '@/js/vuex/FSM/subscription-machine';
import {transition} from '@/js/vuex/fsm-transition';
import {urlB64ToUint8Array} from '@/js/helpers/url-b64-to-uint8-array';

const applicationServerPublicKey = '';

export const SUBSCRIPTION_TRANSITION = 'SUBSCRIPTION_TRANSITION';
export const CHECKING_FOR_SERVICE_WORKER = 'CHECKING_FOR_SERVICE_WORKER';
export const CHECK_FOR_NOTIFICATION = 'CHECK_FOR_NOTIFICATION';
export const CHECK_FOR_SUBSCRIPTION = 'CHECK_FOR_SUBSCRIPTION';
export const SUBSCRIBE_USER = 'SUBSCRIBE_USER';
export const UNSUBSCRIBE_USER = 'UNSUBSCRIBE_USER';
export const UPDATE_SUBSCRIPTION_ON_SERVER = 'UPDATE_SUBSCRIPTION_ON_SERVER';
export const SUBSCRIPTION_READY = 'SUBSCRIPTION_READY';

const state = {
    state: subscriptionMachine.initial,
    registration: null
};

const actions = {
    [SUBSCRIPTION_TRANSITION]: transition.bind(null, subscriptionMachine),
    [CHECKING_FOR_SERVICE_WORKER]({commit, dispatch}, {params}) {
        if (!('serviceWorker' in navigator)) {
            dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
            return;
        }
        navigator.serviceWorker.ready
            .then(res => {
                commit(CHECKING_FOR_SERVICE_WORKER, res);
                dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS', params});
            })
            .catch(() => {
                dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
            });
    },
    [CHECK_FOR_NOTIFICATION]({dispatch}, {params}) {
        if (Notification.permission === 'granted') {
            dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS', params});
        } else {
            Notification.requestPermission(status => {
                if (status === 'granted') {
                    dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS', params});
                } else {
                    dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
                }
            });
        }
    },
    [CHECK_FOR_SUBSCRIPTION](
        {dispatch, state},
        {
            params: {user}
        }
    ) {
        const registration = state.registration;
        registration.pushManager.getSubscription().then(subscription => {
            const isSubscribed = !(subscription === null);
            if (isSubscribed) {
                dispatch('SUBSCRIPTION_TRANSITION', {
                    type: 'SUCCESS',
                    params: {
                        user,
                        type: 'saveSubscription',
                        subscription
                    }
                });
            } else {
                dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE', params: {user}});
            }
        });
    },
    [SUBSCRIBE_USER](
        {dispatch, state},
        {
            params: {user}
        }
    ) {
        const registration = state.registration;
        const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
        registration.pushManager
            .subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            })
            .then(subscription => {
                if (!subscription) {
                    dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
                }
                dispatch('SUBSCRIPTION_TRANSITION', {
                    type: 'SUCCESS',
                    params: {
                        user,
                        type: 'saveSubscription',
                        subscription
                    }
                });
            })
            .catch(() => {
                dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
            });
    },
    [UNSUBSCRIBE_USER](
        {dispatch, state},
        {
            params: {user}
        }
    ) {
        const registration = state.registration;
        registration.pushManager
            .getSubscription()
            .then(subscription => {
                if (subscription) {
                    subscription.unsubscribe();
                    dispatch('SUBSCRIPTION_TRANSITION', {
                        type: 'SUCCESS',
                        params: {
                            user,
                            type: 'removeSubscription',
                            subscription
                        }
                    });
                }
            })
            .catch(function() {
                dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
            });
    },
    [UPDATE_SUBSCRIPTION_ON_SERVER](
        {dispatch},
        {
            params: {type, subscription, user}
        }
    ) {
        axios
            .post(SUBSCRIBE[type], {subscription, user})
            .then(() => {
                dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS'});
            })
            .catch(() => {
                dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
            });
    },
    [SUBSCRIPTION_READY]() {
        console.log('subscription ready');
    }
};

const mutations = {
    [SUBSCRIPTION_TRANSITION](state, nextState) {
        state.state = nextState;
    },
    [CHECKING_FOR_SERVICE_WORKER](state, registration) {
        state.registration = registration;
    }
};

const getters = {
    subscriptionReady(state) {
        return state.state === 'subscriptionReady';
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
