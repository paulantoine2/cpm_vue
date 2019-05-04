<template>
  <section>
    <h2>Time</h2>
    <div>{{ getMinutes }}:{{ getSeconds }}</div>
  </section>
</template>

<script>
import formatTime from '../formatTime'
export default {
  name: 'Timer',
  data () {
    return {
      time: 0
    }
  },
  methods: {
    loop () {
      this.time++
      this.$emit('loop', this.time)
      setTimeout(this.loop, 1000)
    },
    start () {
      this.loop()
    }
  },
  computed: {
    getMinutes () {
      return formatTime(Math.floor(this.time / 60))
    },
    getSeconds () {
      return formatTime(this.time % 60)
    }
  }
}

</script>

<style></style>
