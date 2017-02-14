<template>
    <div id="home">
        <div ref="slides">
            <div class="section is-trans">
                <div class="container has-text-centered content">
                    <img class="hero-logo" src="/images/butter-logo-stacked.svg" alt="Butter Your Bae">
                    <h1>Time to spread that love</h1>
                </div>
            </div>
            <div class="section is-dark">
                <div class="container has-text-centered content">
                    <h1>
                        Messed up last year for Valentines?<br>
                        Don't worry we've got your bae covered
                    </h1>

                    <h1>Send some sausy messages.</h1>
                </div>
            </div>
            <div class="section is-trans">
                <div class="container has-text-centered content">
                    <h1>"Here is an example SMS."</h1>
                </div>
            </div>
            <div class="section is-dark">
                <div class="container has-text-centered content">
                    <router-link class="button is-large is-outlined is-primary"
                    to="/order">Give me some Butter</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import 'fullpage.js';

    export default {
        mounted()
        {
            $( this.$refs.slides ).fullpage({
                navigation: true,
                showActiveTooltip: true,
                paddingTop: '-5.75rem'
            })
        },
        beforeRouteLeave(to, from, next)
        {
            // Destroy the instance of FullPage
            $.fn.fullpage.destroy('all');
            next()
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .hero-logo {
        max-width: 50%;
        margin: 0 auto;
        max-height: 500px;
    }
    .home .section .container {
        padding: 0 3em;
    }
    #fp-nav {
        ul li {
            height: 18px;
            a {
                margin: 1em 0;
                span {
                    background-color: #fc4f6b;
                    transform: rotate(-45deg);
                    border-radius: 0;
                    width: 12px;
                    height: 12px;
                    margin: 1em 0;
                    &:before,
                    &:after {
                      content: "";
                      background-color: #fc4f6b;
                      border-radius: 50%;
                      height: 12px;
                      position: absolute;
                      width: 12px;
                    },
                    &:before {
                        top: -6px;
                        left: 0;
                    }
                    &:after {
                        left: 6px;
                        top: 0;
                    }
                }
                &.active span {
                    border-radius: 0;
                    margin: 1em 0;
                    background-color: darken(#fc4f6b, 25%);
                    &:before,
                    &:after {
                        background-color: darken(#fc4f6b, 25%);
                    }
                }
            }
            &:hover {
                transform: scale(1.3);
                a.active span,
                a span {
                    margin: 1em 0;
                    border-radius: 0;
                }
                a span {
                    width: 12px;
                    height: 12px;
                }
            }

        }
    }
</style>