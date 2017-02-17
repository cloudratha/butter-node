import Vue from 'vue';
import store from './../../store';

// When the request succeeds
const success = ( user ) =>
{
    store.dispatch( 'verify', user )
    store.dispatch( 'processEnd' )
    Vue.router.push({
        name: 'order'
    });
};

// When the request fails
const failed = ( { data } ) =>
{
    store.dispatch( 'processEnd' )
    store.dispatch( 'authError', data )
};

export default (user) =>
{
    store.dispatch( 'processStart' )
    Vue.$http.post( '/api/verify', user )
    .then( ( { data } ) =>
    {
        success( data )
    }).catch( ( { response } ) =>
    {
        failed( response )
    });
};