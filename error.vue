<template>
    <div class="bg-black w-screen h-screen max-h-screen max-w-screen overflow-hidden relative">
        <NuxtLink to="/" class="absolute top-10 left-10 text-white text-2xl md:text-4xl font-semibold">{{ url.origin }}
        </NuxtLink>

        <div class="w-full h-full grid grid-rows-2 md:grid-rows-1 items-center px-20">
            <div class="flex flex-col ga-2 md:gap-4">
                <div class="text-4xl md:text-7xl font-bold text-white mb-2 md:mb-4">ERROR {{ error.statusCode }}</div>
                <div class="text-3xl md:text-5xl font-bold text-white">
                    {{ error.statusMessage || error.message || 'Internal Server Error' }}</div>
                <div class="text-white text-wrap max-w-screen" v-html="error.stack"></div>
                <NuxtLink to="/" class="btn w-min ">Back To Home</NuxtLink>
            </div>
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

const url = useRequestURL();
</script>