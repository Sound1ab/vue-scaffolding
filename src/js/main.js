// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import globalStyles from '@styles/global.scss';

// Directives
import designMode from './directives/designMode';

// Libraries
import * as svgicon from 'vue-svgicon';

// Polyfills
import '@/js/helpers/closest-polyfill';
import 'vue-svgicon/dist/polyfill';
require('intersection-observer');

// Mixins
import {requireImage} from './mixins/require-image.js';

Vue.mixin(requireImage);
Vue.use(svgicon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});
