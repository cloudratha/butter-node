import Vuex from 'vuex'

import auth from './modules/auth'


export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        auth
    }
})

