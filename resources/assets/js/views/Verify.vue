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
                            <p v-if="errors">{{ errors }}</p>
                            <button @click.prevent="verify"
                            class="button is-dark is-medium"
                            :class="{ 'is-loading': $store.state.auth.processing }">Verify</button>
                        </form>
                    </div>
                </div>
                We need to make sure you're not a robot, or a spammer :)
            </div>
        </div>
    </section>
</template>
<script>
import auth from '../services/auth'
    export default {
        data()
        {
            return {
                error: null
            }
        },
        computed:
        {
            errors()
            {
                return ( this.error ) ? this.error : this.$store.state.auth.error;
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

                auth.verify({
                    verify: this.token()
                })
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