import Vue from 'vue';
import store from './../../store';

export default (user) =>
{
    store.dispatch( 'logout' )
    Vue.router.push({
        name: 'home'
    })
};