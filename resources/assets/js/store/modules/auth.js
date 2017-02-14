const state = {
    user: null,
    auth: false
}


const mutations =
{
    CHECK_AUTH: ( state ) =>
    {
        state.auth = !!localStorage.getItem( 'token' )
        if ( state.auth )
        {
            window.axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem( 'token' )
        }
    },
    LOGIN: ( state, token )
    {
        state.auth = true
        localStorage.setItem( 'token', token )
        window.axios.defaults.headers.common.Authorization = 'Bearer ' + token
    }
}

const actions = {
    authCheck( { commit } )
    {
        commit( 'CHECK_AUTH')
    },
    login( { commit }, token )
    {

    },
    logout( {commit} )
    {
        state.auth = false;
        localStorage.removeItem('id_token');
        window.axios.defaults.headers.common.Authorization = '';
    }
}

export default {
    state,
    actions,
    mutations
}