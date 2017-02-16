// Routes
export default [
    {
        name: 'home',
        path: '/',
        component: require('./views/Home')
    },
    {
        name: 'login',
        path: '/login',
        component: require('./views/Login'),
        meta: {
            guest: true
        }
    },
    {
        name: 'register',
        path: '/register',
        component: require('./views/Register'),
        meta: {
            guest: true
        }
    },
    {
        name: 'verify',
        path: '/verify',
        component: require('./views/Verify'),
        meta: {
            auth: true
        }
    },
    {
        name: 'account',
        path: '/account',
        component: require('./views/Account'),
        meta: {
            auth: true
        }
    },
    {
        name: 'order',
        path: '/order',
        component: require('./views/Order'),
        meta: {
            auth: true
        }
    }
]