<template functional>
    <nav class="nav is-fixed-top is-trans">
        <div class="container">
            <div class="nav-left" v-if="$route.name !== 'home'">
                <router-link class="nav-item" to="/" exact>
                    <img src="/images/butter-logo.svg" alt="Butter Your Bae">
                </router-link>
            </div>

            <!-- This "nav-menu" is hidden on mobile -->
            <!-- Add the modifier "is-active" to display it on mobile -->
            <div v-if="!$store.state.auth.user" class="nav-right nav-menu is-flex-mobile">
                <router-link class="nav-item is-tab" to="/login" exact>Login</router-link>
                <li class="nav-item">|</li>
                <router-link class="nav-item is-tab" to="/register">Register</router-link>
            </div>
            <div v-else class="nav-right nav-menu is-flex-mobile">
                <li class="nav-item is-bold">Hi, {{ $store.state.auth.user.name }}</li>
                <li class="nav-item">|</li>
                <router-link class="nav-item is-tab" to="/order" exact>Order</router-link>
                <li class="nav-item">|</li>
                <a class="nav-item is-tab" @click.prevent="logout">Logout</a>
            </div>
        </div>
    </nav>
</template>
<script>
import auth from '../../services/auth'
    export default {
        methods: {
            logout()
            {
                auth.logout()
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    nav {
        position: fixed;
    }
</style>
