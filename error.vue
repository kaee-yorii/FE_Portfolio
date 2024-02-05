<template>
    <div class="bg-black w-screen h-screen max-h-screen max-w-screen overflow-hidden relative">
        <div class="w-full h-full grid grid-rows-2 md:grid-rows-1 items-center px-20">
            <div class="text-4xl md:text-7xl font-bold text-white mb-2 md:mb-4">ERROR {{ error.statusCode }}</div>
            <div class="text-3xl md:text-5xl font-bold text-white">{{ error.statusMessage }}</div>
        </div>

        <IndexImagesBrokenRobot class="w-[110vw] md:w-[80vw] xl:w-[55vw] absolute -right-28 bottom-10" />
        <IndexImagesHills
            class="absolute w-[180vw] -bottom-5 sm:-bottom-12 md:bottom-18 lg:bottom-32 xl:bottom-48 -left-48" />
    </div>
</template>

<script setup>

const props = defineProps({
    error: Object
})

console.log(props.error)
</script>