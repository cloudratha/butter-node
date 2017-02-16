import Vue from 'vue';
import store from './../../store';

// When the request succeeds
const success = (token) => {
    store.dispatch( 'processEnd')
    store.dispatch('login', token)
    Vue.router.push({
        name: 'home'
    });
};

// When the request fails
const failed = ( response ) => {
    store.dispatch( 'processEnd')
    store.dispatch('loginError', response )
};

export default (user) =>
{
    store.dispatch( 'processStart')
    Vue.$http.post( '/api/login', user )
        .then( (data) =>
        {
            success( data )
        })
        .catch( ( { error } ) =>
        {
            failed( error )
        });
};