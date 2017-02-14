<template>
    <div :class="{ 'is-loading': !$store.state.auth.check }">
        <div v-if="$store.state.auth.check">
            <nav-header></nav-header>
            <router-view ></router-view>
        </div>
    </div>
</template>
<script>
    import NavHeader from './views/partials/NavHeader'
    export default {
        route: {
            waitForData: true,
            data (transition)
            {
                return this.$store.dispatch( 'authCheck')
            }
        },
        name: 'butter',
        components: {
            NavHeader
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>