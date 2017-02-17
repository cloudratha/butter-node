import Vue from 'vue'

Vue.config.debug = process.env.NODE_ENV !== 'production';

import axios from 'axios'

import VueRouter from 'vue-router'
import routes from './routes'

Vue.use( VueRouter )

// History Mode to remove Hashbang
export const router = new VueRouter({
    mode: 'history',
    routes
})


// Global Guard - Leveraged as Auth Route Middleware
// See Routes > meta
router.beforeEach( (to, from, next) =>
{
    if (to.matched.some(m => m.meta.verify) && !store.state.auth.active )
    {
        next({
            name: 'login',
        })
    } else if (to.matched.some(m => m.meta.auth) && !store.state.auth.user)
    {
        next({
            name: 'login',
        })
    } else if (to.matched.some(m => m.meta.guest) && store.state.auth.user)
    {
        next({
            name: 'home',
        })
    } else
    {
        next()
    }
})

// Add Route Name to Body Class
router.afterEach( () =>
{
    document.body.className = store.state.route.name
})

Vue.router = router;

import { sync } from 'vuex-router-sync'
import store from './store'

// Sync Router State to Store
sync(store, router)

// Automatically logout user if we get Unauthorised Response
axios.interceptors.response.use( response => response,
    (error) =>
    {
        if ( store.state.auth.user && error.response.status === 401 )
        {
            store.dispatch( 'logout' )
        }
        // Return a promise to persist the chain
        return Promise.reject(error)
    }
);

// Attach CSRF from Adonis Global - Master View
axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Adonis.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};

// Bind axios to Vue Instance
Vue.$http = axios;

// Check Local Storage For Token
store.dispatch( 'authCheck' )


export default {
    router
}