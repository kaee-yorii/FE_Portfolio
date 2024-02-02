<template>
    <div class="max-w-7xl mx-auto px-4">
        <!-- HEADER -->
        <div class="flex justify-between items-end my-4 border-b border-b-neutral pt-10 pb-3">
            <div class="text-4xl font-bold">FULLNAME</div>
            <div class="text-xls">Blog</div>
        </div>
        <!-- title -->
        <div class="text-4-xl font-semibold my-4 text-accent">{{ blog.title }}</div>
        <div class="font-light text-sm">{{ blog.shortDate }}</div>

        <!-- photos -->

        <div class="">
            <Carousel :items-to-show="1.5" :wrapAround="true" :autoplay="10000">
                <slide v-for="photo in blog.photos" :key="photo.id">
                    <div class="aspect-video w-full">
                        <div class="w-full h-full flex justify-centerbg-contain">
                            <img :src="apiUri + photo.path" :alt="blog.title" class="h-full" >
                        </div>
                    </div>
                </slide>

                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </div>

        <!-- content -->
        <div class="my-4 text-justify">{{ blog.content }}</div>
        </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


const route = useRoute();
const blogID = route.params.id;

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const blog = await $fetch('/api/blog/' + blogID);

// ambil data blog, melalui server nuxt



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