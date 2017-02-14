import './bootstrap'

import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'

// Sync Router State to Store
sync(store, router)

store.dispatch( 'authCheck' )

// Global Guard - Leveraged as Auth Route Middleware
// See Routes - meta
router.beforeEach( (to, from, next) =>
{
    if (to.matched.some(m => m.meta.auth) && !store.state.auth.user)
    {
        next({
            name: 'login',
        });
    } else if (to.matched.some(m => m.meta.guest) && store.state.auth.user)
    {
        next({
            name: 'home',
        });
    } else
    {
        next();
    }
})

// Add Route Name to Body Class
router.afterEach( () =>
{
    document.body.className = store.state.route.name
})

import App from './App.vue'

const app = new Vue({
    router,
    store,
    el: '#app',
    template: '<App/>',
    components: { App }
});