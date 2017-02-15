import Vue from 'vue';
const state = {
    user: null,
    auth: false,
    processing: false,
    error: null
}


const mutations =
{
    CHECK_AUTH: ( state ) =>
    {
        state.auth = !!localStorage.getItem( 'token' )
        if ( state.auth )
        {
            Vue.$http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem( 'token' )
        }
    },
    LOGIN_SUCCESS: ( state, token ) =>
    {
        state.auth = true
        localStorage.setItem( 'token', token )
        Vue.$http.defaults.headers.common.Authorization = 'Bearer ' + token
    },
    LOGIN_ERROR: ( state, error ) =>
    {
        state.error = error
    },
    LOGOUT: ( state ) =>
    {
        state.auth = false;
        localStorage.removeItem( 'token' );
        Vue.$http.defaults.headers.common.Authorization = '';
    },
    PROCESS_START: () =>
    {
        state.processing = true
    },
    PROCESS_END: () =>
    {
        state.processing = false
    }
}

const actions = {
    authCheck( { commit } )
    {
        commit( 'CHECK_AUTH')
    },
    login( { commit }, token )
    {
        commit( 'LOGIN_SUCCESS', token )
    },
    loginError( { commit }, error )
    {
        commit( 'LOGIN_ERROR', error )
    },
    logout( {commit} )
    {
        commit( 'LOGOUT' )
    },
    processStart( {commit} )
    {
        commit( 'PROCESS_START' )
    },
    processEnd( {commit} )
    {
        commit( 'PROCESS_END' )
    }
}

export default {
    state,
    actions,
    mutations
}