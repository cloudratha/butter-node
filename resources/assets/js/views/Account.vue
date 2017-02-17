<template>
    <section id="login" class="hero is-fullheight is-trans">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="card content">
                    <div class="card-content">
                        <h1>Login</h1>
                        <form ref="login">
                            <p class="control">
                                <input v-model="email" class="input is-medium" type="email" placeholder="Email">
                            </p>
                            <p class="control">
                                <input v-model="password" class="input is-medium" type="password" placeholder="Password">
                            </p>
                            <p v-if="error">{{ error }}</p>
                            <button @click.prevent="login"
                            class="button is-dark is-medium"
                            :class="{ 'is-loading': async }">Login</button>
                        </form>
                    </div>
                </div>
                Need an Account? <router-link class="is-link" to="/register">Register Here</router-link>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
    export default {

    }
</script>
<style lang="scss" rel="stylesheet/scss">
    #login .card {
        max-width: 600px;
        margin: 0 auto 2em auto;
        form {
            margin: 2em auto;
            max-width: 400px;
        }
    }
</style>