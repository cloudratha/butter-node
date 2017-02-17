<template>
    <div id="slider">
        <div ref="counter" class="counter">
            <span class="pointer" :class="{'is-disabled' : min === count}"
            @click.prevent="decrement">-</span>
            <span>{{ this.count }}</span>
            <span class="pointer" :class="{'is-disabled' : max === count}"
            @click.prevent="increment">+</span>
        </div>
        <div ref="slider" class="ui-slider" tabindex="0">
            <div v-show="tooltip" ref="tooltip" class="tooltip">{{ tooltip }}</div>
            <div class="ui-slider-containment"></div>

            <div class="ui-slider-wrapper">
                <div class="ui-slider-track-container">
                    <div class="ui-slider-track"></div>
                    <div ref="container" class="ui-slider-track-fill"
                    :style="{ width: ( remainPoint + 2 ) + '%', left: ( startPoint - 1 ) + '%'}"></div>
                </div>
                <div v-for="(item,index) in order"
                    class="ui-slider-thumb-container"
                    ref="thumb"
                    @mousedown="sliderClick( $event, index)"
                >
                    <div class="ui-slider-focus-ring"></div>
                    <div class="ui-slider-thumb"></div>
                </div>
                <div class="ui-slider-controls">
                    <span class="start">{{ parseTime( activeTime ) }}</span>
                    <span v-for="n in 46">|</span>
                    <span class="end">{{ parseTime( endTime ) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Dragabilly from 'draggabilly'

    export default {

        mounted()
        {
            // Setup Timer for current time
            window.setInterval(() => {
                //this.currentTime = Math.trunc((new Date()).getTime() / 1000);
            },1000);


            window.addEventListener('resize', this.redraw);

            this.setup();
        },

        props : {
            value : {
                type : Array
            },
            min : {
                type: Number,
                default: 1
            },
            max : {
                type: Number,
                default: 30
            }
        },

        data() {
            return {
                order: [],
                count: 3,
                keyboardStep: 5,
                needsUpdate: null,
                active: null,
                activeTime: 1487318400, // 14 Feb 08:00
                endTime: 1487448000, // 14 Feb 20:00
                interval: 900, // 15 minutes
                currentTime: Math.trunc((new Date()).getTime() / 1000),
                //currentTime: 1487072000,
                tooltip: null
            }
        },

        computed: {
            remainPoint()
            {
                let start = ( this.activeTime < this.currentTime ) ? this.currentTime : this.activeTime;
                let total = this.endTime - this.activeTime;
                let active = this.endTime - start;

                return active / total * 100;
            },
            startPoint()
            {
                return 100 - this.remainPoint;
            }
        },

        methods: {
            broadcast()
            {
                this.$emit( 'input', this.order )
            },
            setup()
            {
                // Component Props are not 2 way. Use local variable and $emit
                this.order = [];
                // Ratio Based on remainding time
                var ratio = this.remainPoint / (this.count + 1);
                for ( let x = 0; x < this.count; x++ )
                {
                    // Evenly distributes the markers
                    var amount = ratio * ( x + 1 ) + this.startPoint;
                    this.$set(this.order, x, {
                        value: amount,
                        draggable: null,
                        dragging: false,
                        timestamp: null
                    });
                }
                this.$nextTick( function()
                    {
                        for ( var x = 0; x < this.count; x++ )
                        {
                            this.$refs.thumb[x].style.left = this.order[x].value + '%';
                            this.order[x].timestamp = ( ( this.endTime - this.activeTime ) * this.order[x].value / 100 ) + this.activeTime;
                            this.order[x].draggable = new Dragabilly( this.$refs.thumb[x], {
                                containment: this.$refs.container,
                                axis: 'x'
                            });
                            this.order[x].draggable.on('dragStart', this.dragStart, [x] );
                            this.order[x].draggable.on('dragMove', this.dragMove, [x] );
                            this.order[x].draggable.on('dragEnd', this.dragEnd, [x] );
                        }

                        this.broadcast()
                    })
            },
            redraw()
            {
                for( let i in this.order )
                {
                    this.$refs.thumb[i].style.left = this.order[i].value + '%';
                }
            },
            parseTime( time )
            {
                var date = new Date( time * 1000 )
                var hours = '0' + date.getHours();
                var minutes = '0' + date.getMinutes();
                return hours.substr(-2) + ':' + minutes.substr(-2)
            },
            sliderClick(e, index )
            {
                this.active = index;
            },
            dragStart( e )
            {
                var newObject = this.order[this.active];
                newObject.dragging = true;

                this.$set(this.order, this.active, newObject );
            },
            dragMove( e )
            {
                let x = this.order[this.active].draggable.position.x;
                let newValue = (x / this.$refs.slider.getBoundingClientRect().width) * 100;
                let converted = this.convertToTimestamp( newValue );
                this.tooltip = this.parseTime(converted);
                this.order[this.active].timestamp = converted;
                this.$refs.tooltip.style.left = newValue + '%';

                this.setValue(newValue);
            },
            dragEnd( e )
            {
                this.tooltip = null;
                var newObject = this.order[this.active];
                newObject.dragging = false;

                this.$set(this.order, this.active, newObject );

                this.broadcast

            },
            setValue(newValue, updateThumb)
            {
                if ( newValue === this.order[this.active].value )
                {
                    return;
                }

                // Round the value
                var moderatedValue = Math.round( newValue );

                // Check for max
                if ( moderatedValue >= 100 )
                {
                    moderatedValue = 100;
                }

                // Check for min
                if ( moderatedValue <= 0 )
                {
                    moderatedValue = 0;
                }

                var newObject = this.order[this.active];
                newObject.value = moderatedValue;

                this.$set(this.order, this.active, newObject );

                if ( updateThumb )
                {
                    this.$refs.thumb[this.active].style.left = this.order[this.active].value + '%';
                }

                this.broadcast()
            },
            convertToTimestamp( value )
            {
               let convert = Math.round( ( ( this.endTime - this.activeTime ) * value / 100 ) + this.activeTime) - 19;
               if ( convert - 250 < this.activeTime )
               {
                    return this.activeTime
               }

               if ( convert + 250 > this.endTime )
               {
                    return this.endTime
               }

               return convert;
            },
            decrement()
            {
                if ( this.min !== this.count )
                {
                    this.count--;
                    this.setup()
                }
            },
            increment()
            {
                if ( this.max !== this.count )
                {
                    this.count++;
                    this.setup();
                }
            }
        }
    }

</script>
<style lang="scss" rel="stylesheet/scss">
    // Overall slider width
    $slider-width : 100%;

    // Track line
    $track-height : 3px;
    $track-background-color : rgba(252,79,107,0.28);
    $track-fill-color : #fc4f6b;

    // Thumb
    $thumb-size : 16px;
    $thumb-scale-active : 1.1;
    $thumb-container-size : 16px;

    // Transition durations
    $thumb-transition-duration : 0.2s;
    $track-transition-duration : 0.1s;

    // Colors
    $thumb-fill-color : $track-fill-color;
    $thumb-background-color : $track-fill-color;

    #slider {
        margin-bottom: 2em;
    }

    .counter {
        display: flex;
        width: 50%;
        max-width: 300px;
        margin: 2em auto 6em auto;
        span {
            flex: 1;
            font-size: 3rem;
        }
        .pointer {
            cursor: pointer;
        }
    }

    // Slider container
    .ui-slider {
        position: relative;
        width: $slider-width;
        height: $thumb-container-size + 4px;
        display: flex;
        align-items: center;
        outline: none;

        .tooltip {
            background-color: $track-background-color;
            color: $thumb-fill-color;
            padding: 10px;
            border-radius: 6px;
            position: absolute;
            top: -80px;
            transform: translateX(-50%);
        }

        // Increase size of thumb on slider hover
        &:hover {
            .ui-slider-thumb {
                transform: scale($thumb-scale-active);
            }
        }

        // Increase size of thumb and focus dot on mousedown
        .is-pointer-down {
            .ui-slider-thumb {
                transform: scale($thumb-scale-active);
            }

            .ui-slider-focus-ring {
                transform: scale(2);
            }
        }
    }

    .ui-slider-wrapper {
        position: relative;
        width: 100%;
    }

    .ui-slider-track-container {
        position: relative;
    }

    .ui-slider-track {
        height: $track-height;
        background-color: $track-background-color;
        width: 100%;
    }

    .ui-slider-track-fill {
        position: absolute;
        top: 0;
        height: $track-height;
        background-color: $track-fill-color;
    }

    .ui-slider-controls {
        width: 100%;
        color: $track-background-color;
        margin-top: 1em;
        display: flex;
        span {
            flex: 1;
        }
        .start,
        .end {
            color: opacify( $track-background-color, 0.15 );
        }
    }

    .ui-slider-thumb-container {
        position: absolute;
        left: 0;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -($thumb-container-size / 2) - ($track-height / 2);
        margin-left: -($thumb-container-size / 2) - ($track-height / 2);
        width: $thumb-container-size;
        height: $thumb-container-size;
    }

    .ui-slider-thumb {
        display: flex;
        align-items: center;
        justify-content: center;
        width: $thumb-size;
        height: $thumb-size;
        background-color: $thumb-fill-color;
        border-radius: 50%;
        transition-property: transform;
        transition-duration: $thumb-transition-duration;
        transition-timing-function: linear;
        transform: scale(1);
    }

    .ui-slider-focus-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: $thumb-container-size;
        height: $thumb-container-size;
        border-radius: 50%;
        background-color: transparentize($thumb-fill-color, 0.38);
        transition: transform 0.2s ease;
        transform: scale(0);
    }

    .ui-slider-containment {
        left: 0;
        right: 0;
        position: absolute;
        margin-left: -($thumb-container-size / 2) - ($track-height / 2);
        margin-right: -($thumb-container-size / 2) - ($track-height / 2);
    }

    .page {
        max-width: 400px;
        margin: 24px;

        input {
            margin-top: 40px;
        }
    }

    * {
        box-sizing: border-box;
    }

</style>