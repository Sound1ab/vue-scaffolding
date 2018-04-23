import axios from 'axios';
import {fetchMachine} from '@/js/vuex/FSM/fetch-machine';
import {transition} from '@/js/vuex/fsm-transition';

export const FETCH_TRANSITION = 'FETCH_TRANSITION';
export const CREATE_CANCEL_TOKEN = 'CREATE_CANCEL_TOKEN';
export const CANCEL_OUTGOING_REQUEST = 'CANCEL_OUTGOING_REQUEST';
export const FETCH_DATA = 'FETCH_DATA';

function initialState() {
    return {
        state: fetchMachine.initialState,
        cancelToken: null,
        data: {},
        previous: null,
        next: null
    };
}

const state = initialState();

const actions = {
    [FETCH_TRANSITION]: transition.bind(null, fetchMachine),
    [CREATE_CANCEL_TOKEN]({commit, dispatch}, {params}) {
        let CancelToken = axios.CancelToken;
        let source = CancelToken.source();
        commit(CREATE_CANCEL_TOKEN, source);
        dispatch(FETCH_TRANSITION, {type: 'TOKEN_CREATED', params});
    },
    [CANCEL_OUTGOING_REQUEST]({state}) {
        if (state.cancelToken) {
            state.cancelToken.cancel();
        }
    },
    // Function dynamically decides on which query to send
    // based on the type of dispatch function used.
    // Either page load or search
    [FETCH_DATA](
        {commit, dispatch},
        {
            params: {type, page = 1, query = ''}
        }
    ) {
        const queryString = type === 'SEARCH' && query.length > 0 ? `?page=${page}&search=${query}` : `?page=${page}`;
        axios
            .get(`${starWars['PEOPLE']}${queryString}`)
            .then(res => {
                if (res.status !== 200 && !res.data) {
                    throw new Error(res.statusText);
                }
                commit(FETCH_DATA, {
                    data: res.data.results,
                    previous: res.data.previous,
                    next: res.data.next
                });
                dispatch(FETCH_TRANSITION, {type: 'SUCCESS'});
            })
            .catch(() => {
                dispatch(FETCH_TRANSITION, {type: 'FAILURE'});
            });
    }
};

const mutations = {
    [FETCH_TRANSITION](state, nextState) {
        state.state = nextState;
    },
    [CREATE_CANCEL_TOKEN](state, cancelToken) {
        state.cancelToken = cancelToken;
    },
    [FETCH_DATA](state, {data, previous, next}) {
        state.data = data;
        state.previous = previous;
        state.next = next;
    }
};

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};
