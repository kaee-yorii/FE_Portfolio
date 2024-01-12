<template>
  <div v-if="showBlock" @click="stopTimer" class="block w-40  rounded-md bg-sky-500 text-white text-center p-10 m-10">
    click me
  </div>
</template>

<script>
export default {
    props: ['delay'],
    data() {
        return {
            showBlock: false,
            timer: null,
            reactionTime: 0
        }
    },
    mounted() {
        setTimeout(() => {
            this.showBlock = true
            this.startTimer()
        }, this.delay )
    },
    methods: {
        startTimer() {
            this.timer = setInterval(() => {
                this.reactionTime += 10
            }, 10) 
        },
        stopTImer() {
            clearInterval(this.timer)
            console.log(this.reactionTime)
        }
    }
}
</script>

<style>
    
</style>