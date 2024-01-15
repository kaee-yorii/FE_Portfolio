<template>
          <main class="flex flex-col items-center">
            <h1 class="p-5 text-3xl font-bold underline">Hello world!</h1>
            <button class=" text-2xl text-center p-2 rounded bg-slate-300 text-black font-semibold" @click="start" :disable="isPlaying">play</button>
            <Block class="item-center" v-if="isPlaying" :delay="delay" @end="endGame" /> 
            <p v="if=showResults">Reaction Time: {{ score }} ms</p>
        </main>
</template>

<script>
import  Block from '../components/Block.vue';

export default {
    name: 'App',
    components: { Block },
    data() {
        return {
            isPlaying: false,
            delay: null,
            score: null,
            showResults: false
        }
    },
    methods: {
        start() {
            this.delay = 2000 + Math.random() * 5000
            this.isPlaying = true
        },
        endGame(reactionTime) {
            this.score = reactionTime
            this.isPlaying = false
            this.showResults = true
        }
    }
}
</script>

<style>

</style>