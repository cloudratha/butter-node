<template>
    <section id="register" class="hero is-fullheight is-trans">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="card content">
                    <div class="card-content">
                        <img src="images/butter-slice.svg" alt="Butter Slice">
                        <h1>Registration</h1>
                        <form ref="register">
                            <p class="control">
                                <input name="first_name" class="input is-medium" type="text" placeholder="Name" v-model="name">
                                <span v-if="validation.hasError('name')" class="help">{{ validation.firstError('name') }}</span>
                            </p>
                            <p class="control">
                                <input name="last_name" class="input is-medium" type="text" placeholder="Surname" v-model="surname">
                                <span v-if="validation.hasError('surname')" class="help">{{ validation.firstError('surname') }}</span>
                            </p>
                            <p class="control">
                                <input name="email" class="input is-medium" type="email" placeholder="Email" v-model="email">
                                <span v-if="validation.hasError('email')" class="help">{{ validation.firstError('email') }}</span>
                            </p>
                            <p>We will need to verify your South African mobile number.</p>
                            <div class="control">
                                <p class="control has-addons is-expanded">
                                    <span class="button is-disabled is-medium">+27</span>
                                    <input name="mobile" class="input is-medium is-expanded" type="text" placeholder="831231234" v-model="mobile">
                                </p>
                                <span v-if="validation.hasError('mobile')" class="help">{{ validation.firstError('mobile') }}</span>
                            </div>
                            <p class="control">
                                <input name="password" class="input is-medium" type="password" placeholder="Password" v-model="password">
                                <span v-if="validation.hasError('password')" class="help">{{ validation.firstError('password') }}</span>
                            </p>
                            <p class="control">
                                <input name="password_confirm" class="input is-medium" type="password" placeholder="Confirm Password" v-model="password_confirm">
                                <span v-if="validation.hasError('password_confirm')" class="help">{{ validation.firstError('password_confirm') }}</span>
                            </p>
                            <p v-if="error">{{ error }}</p>
                            <button class="button is-dark is-medium"
                                v-bind:class="{'is-loading': async}"
                                @click.prevent="register">Register</button>
                        </form>
                    </div>
                </div>
                Already Registered? <router-link class="is-link" to="/login">Login</router-link>
            </div>
        </div>
    </section>
</template>
<script>
const SimpleVueValidation = require('simple-vue-validator')
const Validator = SimpleVueValidation.Validator;
import axios from 'axios'
    export default {
        mixins: [ SimpleVueValidation.mixin],
        data()
        {
            return {
                name: '',
                surname: '',
                email: '',
                mobile: '',
                password: '',
                password_confirm: '',
                error: null,
                async: false
            }
        },
        validators: {
            name( value )
            {
                return Validator.value(value).required().regex('^[A-Za-z ]*$', 'Must only contain alphabetic characters.');
            },
            surname( value )
            {
                return Validator.value(value).required().regex('^[A-Za-z ]*$', 'Must only contain alphabetic characters.');
            },
            email( value )
            {
                return Validator.value(value).required().email()
            },
            mobile( value )
            {
                return Validator.custom( () =>
                {
                    if ( value.toString()[0] === '0' )
                    {
                        return 'Cannot lead with a Zero after country code.'
                    }
                }).value(value).required().digit('Can only contain numbers.').length(9)
            },
            password( value )
            {
                return Validator.value(value).required().minLength(6)
            },
            password_confirm( value )
            {
                return Validator.value(value).required().match(this.password, 'Passwords need to match.')
            }
        },
        methods: {
            register( event )
            {
                this.error = null;
                this.$validate()
                if ( this.validation.hasError() )
                {
                    this.error = 'Please correct all the errors before submitting.'
                    return;
                }

                // Validatioin Passed
                this.async = true;

                axios.post( '/api/register', {
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    mobile: this.mobile,
                    password: this.password,
                    password_confirmation: this.password_confirm
                } ).then( (response) =>
                {
                    this.async = false
                    this.$store.dispatch( 'authInit', response )
                    this.$router.push( 'account' )
                }).catch( (errors) =>
                {
                    this.async = false

                    if ( errors.response )
                    {
                        if ( errors.response.data.hasOwnProperty('error') )
                        {
                            this.error = 'Unable to authenticate you. Please try again later.'
                            return
                        }
                        let data = errors.response.data
                        for ( let error in data )
                        {
                            for ( let message of data[error] )
                            {
                                this.validation.addError( error, message )
                            }
                        }
                    } else
                    {
                        // System error if axios doesnt return a response bag
                        this.error = 'We are unable to process registration at this time. Please try again later.'
                    }
                })
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    #register .card {
        max-width: 600px;
        margin: 0 auto 2em auto;
        img {
            max-width: 8em;
        }
        form {
            margin: 2em auto;
            max-width: 400px;
        }
        .has-addons {
            box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
            span {
                background-color: white;
                opacity: 1;
                padding-right: 0;
                border: 1px solid white;
            }
            input {
                border: 1px solid white;
                box-shadow: none;
                padding-left: 0;
            }
        }
    }
</style>