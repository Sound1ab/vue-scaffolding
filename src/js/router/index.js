import Vue from 'vue';
import Router from 'vue-router';
import Home from '@layouts/Home/Home';
import Login from '@/js/layouts/Login/Login';

Vue.use(Router);

export default new Router({
    fallback: false,
    scrollBehavior: () => ({y: 0}),
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        }
    ]
});
