<template>
    <section id="verify" class="hero is-fullheight is-trans">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="card content">
                    <div class="card-content">
                        <h1>Verify your Mobile Number</h1>
                        <form ref="verify">
                            <div class="control is-grouped">
                                <p v-for="n in 5" class="control is-expanded">
                                    <input ref="token" class="input is-medium" type="text" maxlength="1" @keyup="autoFocus">
                                </p>
                            </div>
                            <p v-if="error">{{ error }}</p>
                            <button @click.prevent="verify"
                            class="button is-dark is-medium"
                            :class="{ 'is-loading': async }">Verify</button>
                        </form>
                    </div>
                </div>
                We need to make sure you're not a robot, or a spammer :)
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
    export default {
        data()
        {
            return {
                error: null,
                async: false
            }
        },
        methods: {
            autoFocus( event )
            {
                this.error = ''

                let current = event.target.value
                let next = event.target.parentNode
                // Determine direction of focus
                next = ( current === '' ) ? next.previousElementSibling : next.nextElementSibling
                if ( next )
                {
                    let field = next.querySelectorAll('input')
                    if ( field.length )
                    {
                        field[0].focus()
                    }
                }
            },
            verify()
            {
                this.error = null;

                if ( !this.validate() )
                {
                    this.error = 'Incorrect token format.'
                    return
                }

                this.async = true

                axios.post('/api/verify', {
                    verify: this.token()
                }).then( (response) =>
                {
                    this.async = false
                    this.$store.dispatch( 'authInit', response )
                    this.$router.push( 'account' )
                }).catch( (errors) => {
                    this.async = false
                    if ( errors.response )
                    {
                        this.error = 'Your verification failed. Please try again.'
                    } else
                    {
                        // System error if axios doesnt return a response bag
                        this.error = 'We are unable to verify you. Please try again later.'
                    }
                });
            },
            validate()
            {
                let tokens = this.$refs.token
                for ( let index in tokens )
                {
                    let token = tokens[index].value
                    if ( ! /^\d*$/.test(token) || token.length !== 1 )
                    {
                        return false
                    }
                }

                return true
            },
            token()
            {
                let token = '';
                let tokens = this.$refs.token
                for ( let index in tokens )
                {
                    token += tokens[index].value
                }
                return token
            }
        },

        beforeRouteEnter(to, from, next)
        {
            next( vm =>
            {
                let user = vm.$store.state.auth.user
                if ( user && user.active )
                {

                    next('/order');
                }
            })
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    #verify .card {
        max-width: 600px;
        margin: 0 auto 2em auto;
        form {
            margin: 2em auto;
            max-width: 400px;
        }
    }
</style>