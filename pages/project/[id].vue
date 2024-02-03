<template>
    <div class="max-w-7xl mx-auto px-4">
        <!-- HEADER -->
        <div class="flex justify-between items-end my-4 border-b border-b-neutral pt-10 pb-3">
            <div class="text-4xl font-bold">FULLNAME</div>
            <NuxtLink to="/project" class="text-xls">project</NuxtLink>
        </div>
        
        <!-- photos -->
        
        <div class="">
            <Carousel :items-to-show="1.5" :wrapAround="true" :autoplay="3000">
                <slide v-for="photo in project.photos" :key="photo.id">
                    <div class="aspect-video w-full">
                        <div class="w-full h-full flex justify-centerbg-contain">
                            <img :src="apiUri + photo.path" :alt="project.title" class="h-full" >
                        </div>
                    </div>
                </slide>

                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </div>
        
        <!-- title -->
        <div class="text-4-xl font-semibold my-4 text-accent">{{ project.title }}</div>
        <div class="font-light text-sm">{{ project.shortDateTime }}</div>
        
        <!-- content -->
        <div class="my-4 text-justify">{{ project.content }}</div>
        </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


const route = useRoute();
const projectID = route.params.id;

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const project = await $fetch('/api/project/' + projectID);

// ambil data project, melalui server nuxt



</script>

<style>
.carousel {
    display: block;
}

.carouselviewport {
    border-radius: 0.25rem;
}

@media (min-width: 768px) {

    .carouselviewport {
        border-radius: 0.5rem;
    }
}

@media (min-width: 1024px) {
    .carousel__viewport {

        border-radius: 1rem;
    }
}
</style>