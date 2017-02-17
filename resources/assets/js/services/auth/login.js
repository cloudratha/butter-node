import Vue from 'vue';
import store from './../../store';

// When the request succeeds
const success = ( user ) =>
{
    store.dispatch( 'login', user )
    store.dispatch( 'processEnd')
    Vue.router.push({
        name: 'home'
    });
};

// When the request fails
const failed = ( response ) =>
{
    store.dispatch( 'processEnd')
    store.dispatch( 'authError', response )
};

export default (user) =>
{
    store.dispatch( 'processStart')
    Vue.$http.post( '/api/login', user )
        .then( function(data)
        {
            success( data )
        })
        .catch( function( error )
        {
            failed( error )
        });
};