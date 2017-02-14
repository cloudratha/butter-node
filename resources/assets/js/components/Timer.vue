<template>
  <div class="timer">
    <div class="block">
      <p class="digit">{{ days | two_digits }}</p>
      <p class="text">Days</p>
    </div>
    <div class="block">
      <p class="digit">{{ hours | two_digits }}</p>
      <p class="text">Hours</p>
    </div>
    <div class="block">
      <p class="digit">{{ minutes | two_digits }}</p>
      <p class="text">Minutes</p>
    </div>
    <div class="block">
      <p class="digit">{{ seconds | two_digits }}</p>
      <p class="text">Seconds</p>
    </div>
  </div>
</template>
<script>
  export default {

    mounted() {
      window.setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000);
      },1000);
    },

    props : ['date'],

    data() {
      return {
        now: Math.trunc((new Date()).getTime() / 1000),
        parsed: Math.trunc(Date.parse(this.date) / 1000)
      }
    },

    computed: {
      seconds() {
        return (this.parsed - this.now) % 60;
      },

      minutes() {
        return Math.trunc((this.parsed - this.now) / 60) % 60;
      },

      hours() {
        return Math.trunc((this.parsed - this.now) / 60 / 60) % 24;
      },

      days() {
        return Math.trunc((this.parsed - this.now) / 60 / 60 / 24);
      }
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss">
  .timer {
    max-width: 90%;
    margin: 0 auto;
  }
  .block {
    display: inline-block;
    margin: 10px;
    @media( min-width: 450px) {
      margin: 15px;
    }
  }

  .text {
    color: #FC4F6B;
    font-size: 0.7rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    margin-top:10px;
    margin-bottom: 10px;
    text-align: center;
    @media( min-width: 450px) {
      font-size: 1rem;
    }
  }

  .digit {
    color: #FC4F6B;
    font-size: 1rem;
    font-weight: 100;
    font-family: 'Montserrat', sans-serif;
    margin: 5px;
    text-align: center;
    @media( min-width: 450px) {
      font-size: 2rem;
      margin: 10px;
    }
  }
</style>