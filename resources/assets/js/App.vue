<template>
    <div>
        <nav-header></nav-header>
        <router-view></router-view>
    </div>
</template>
<script>
    import store from './store';
    import { router } from './bootstrap';
    import NavHeader from './views/partials/NavHeader'
    export default {
        store,
        router,
        mounted()
        {
            // if (this.$store.state.auth.authenticated) {
            //     this.$store.dispatch( 'getUser');
            // }
        },
        components: {
            NavHeader
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>