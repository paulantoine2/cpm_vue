<template>
  <div id="app">
    <div id="top">
      <timer v-on:loop="onTimeUpdate" ref="timer"/>
      <section>
        <h2>CPM</h2>
        {{ cpm }}
      </section>
      <section>
        <h2>Characters</h2>
        {{ total_characters }}
      </section>
    </div>

    <section>
      <h4>{{ words[word_index + 2] }}</h4>
      <h3>{{ words[word_index + 1] }}</h3>
      <h2>{{ words[word_index] }}</h2>
      <input type="text" v-model="typing" @input="onChange">
    </section>
  </div>
</template>

<script>
import Timer from './components/Timer'

export default {
  name: 'App',
  components: {
    Timer
  },
  data () {
    return {
      cpm: 0,
      typing: '',
      word_index: 0,
      words: [],
      total_characters: 0,
      time: 0,
      started: false
    }
  },
  methods: {
    onChange () {
      if (!this.started) {
        // Start the timer only when start typing
        this.$refs.timer.start()
        this.started = true
      }
      const word = this.words[this.word_index]
      // If the word typed is correct, recalculate CPM et go to next word
      if (this.typing === word) {
        this.total_characters += word.length
        this.cpm = Math.ceil((this.total_characters / this.time) * 60)
        this.word_index++
        this.typing = ''
      }
    },
    onTimeUpdate (time) {
      // When time run, get it from the timer to calculate de CPM
      this.time = time
    }
  },
  mounted () {
    // Load 100 words
    fetch('https://random-word-api.herokuapp.com/word?key=0U1S2FF5&number=100')
      .then(response => response.json())
      .then(json => {
        this.words = json
      })
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  #top {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
  #top section {
    width: 200px;
  }
  input {
    padding: 10px;
    font-size: 20px;
  }
</style>
