import Vue from 'vue';

const state = {
    user: null,
    auth: false,
    processing: false,
    error: null,
    active: null
}


const mutations =
{
    AUTH_CHECK: ( state ) =>
    {
        state.auth = !!localStorage.getItem( 'token' )
        if ( state.auth )
        {
            Vue.$http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem( 'token' )
            state.user = JSON.parse( localStorage.getItem( 'user' ) )

        }
    },
    LOGIN: ( state, data ) =>
    {
        state.auth = true
        localStorage.setItem( 'token', data.token )
        state.user = data.user
        state.active = data.user.active
        localStorage.setItem( 'user', JSON.stringify(data.user) )
        Vue.$http.defaults.headers.common.Authorization = 'Bearer ' + data.token
    },
    VERIFY: (state, { user } ) =>
    {
        state.user = user
        state.active = user.active
        localStorage.setItem( 'user' , JSON.stringify(user) )
    },
    AUTH_ERROR: ( state, error ) =>
    {
        state.error = error
    },
    LOGOUT: ( state ) =>
    {
        state.auth = false
        state.user = null
        state.active = false
        localStorage.removeItem( 'token' );
        localStorage.removeItem( 'user' );
        Vue.$http.defaults.headers.common.Authorization = '';
    },
    PROCESS_START: () =>
    {
        state.error = null
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
        commit( 'AUTH_CHECK')
    },
    login( { commit }, { data } )
    {
        commit( 'LOGIN', data )
    },
    verify( {commit}, user )
    {
        commit( 'VERIFY', user )
    },
    authError( { commit }, error )
    {
        if ( typeof error === 'object' )
        {
            for ( let index in error )
            {
                if ( error[index].hasOwnProperty( 'message') )
                {
                    commit( 'AUTH_ERROR', error[index].message )
                    break
                }
            }
            if ( error.hasOwnProperty('error') )
            {
                commit( 'AUTH_ERROR', error.error )
                return
            }
        }
        commit( 'AUTH_ERROR', error )
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