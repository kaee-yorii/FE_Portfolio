<template>
    
 <h1>Kae Reaction Timer</h1>
  <button @click="start">play</button>
  <Block v-if="isPlaying" :delay="delay" />
</template>

<script>
import  Block from './components/Block.vue';

export default {
    name: 'App',
    components: { Block },
    data() {
        return {
            isPlaying: false,
            delay: null,
        }
    },
    methods: {
        start() {
            this.delay = 2000 + Math.random() * 5000
            this.isPlaying = true
        }
    }
}
</script>

<style>

</style>