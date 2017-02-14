<template>
    <section id="order" class="hero is-fullheight is-trans">
        <div class="hero-body">
            <div class="container content has-text-centered">
                <h1>How many SMS's do you wanna send?</h1>
                <slider v-model="order"></slider>
                <small>Drag the slider markers to set the individual send times</small>
                <h3>Who do you wanna butter up?</p>
                <div class="control">
                    <p class="control has-addons is-expanded content has-text-centered">
                        <span class="button is-disabled is-medium">+27</span>
                        <input name="mobile" class="input is-medium is-expanded" type="text" placeholder="831231234" v-model="receiver">
                    </p>
                    <span v-if="validation.hasError('receiver')" class="help">{{ validation.firstError('receiver') }}</span>
                </div>
                <div class="purchase content">
                    <a class="button is-medium is-primary"
                    :class="{ 'is-loading' : async }"@click.prevent="purchase">Purchase</a>
                </div>
                <p v-if="error">{{ error }}</p>
            </div>
        </div>
    </section>
</template>
<script>
    const SimpleVueValidation = require('simple-vue-validator')
    const Validator = SimpleVueValidation.Validator;
    import Slider from '../components/Slider'
    import axios from 'axios'
    export default {
        mixins: [ SimpleVueValidation.mixin],
        data()
        {
            return {
                order: [],
                receiver: '',
                error: null,
                async: false
            }
        },
        validators: {
            receiver( value )
            {
                return Validator.custom( () =>
                {
                    if ( value.toString()[0] === '0' )
                    {
                        return 'Cannot lead with a Zero after country code.'
                    }
                }).value(value).required().digit('Can only contain numbers.').length(9)
            },
        },
        components: {
            Slider
        },
        methods: {
            purchase()
            {
                this.async = true

                this.$validate()
                if ( this.validation.hasError() )
                {
                    this.error = 'Please correct all the errors before submitting.'
                    return;
                }

                axios.post('/api/order', {
                    messages : this.formatted(),
                    receiver : this.receiver
                }).then( (response) =>
                {
                    this.async = false
                }).catch( (errors) => {
                    this.async = false
                    if ( errors.response )
                    {
                        this.error = 'Your email and password combination does not match.'
                    } else
                    {
                        // System error if axios doesnt return a response bag
                        this.error = 'We are unable to take orders at this time. Please try again later.'
                    }
                });
            },
            formatted()
            {
                let messages = [];
                for ( let item of this.order )
                {
                    messages.push( item.timestamp );
                }
                return messages;
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    #order {
        h1 {
            margin-bottom: 3em;
        }
        .purchase {
            margin-top: 2em;
        }
        .container p {
            margin-top: 2em;
        }
        div.control {
            max-width: 100%;
            @media( min-width: 760px) {
                max-width: 50%;
                margin: 0 auto;
            }
        }
    }
</style>