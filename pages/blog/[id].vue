<template>
    <div class="max-w-7xl mx-auto px-4">
        <!-- HEADER -->
        <IndexHeader :title="'Blogs'" :url="'/blog'" />

        <!-- photos -->

        <div class="">
            <Carousel :items-to-show="1.5" :wrapAround="true" :autoplay="3000">
                <slide v-for="photo in blog.photos" :key="photo.id">
                    <div class="aspect-video w-full">
                        <div class="w-full h-full flex justify-centerbg-contain">
                            <img :src="apiUri + photo.path" :alt="blog.title" class="h-full">
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
        <div class="text-4-xl font-semibold my-4 text-accent">{{ blog.title }}</div>
        <div class="font-light text-sm">{{ blog.shortDateTime }}</div>

        <!-- content -->
        <div class="my-4 text-justify">{{ blog.content }}</div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['profile']
})

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


const route = useRoute();
const blogID = route.params.id;

const blog = await $fetch('/api/blog/' + blogID);

// SEO and META
const { value: useProfile } = useState('profile');
const fullname = `${useProfile.lastName} ${useProfile.firstName}`
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const firstPhoto = blog.photos.length ? (apiUri + blog.photos[0].path) : '';
useSeoMeta({
    title: `${blog.title} = ${fullname} Blog`,
    description: blog.description,
    ogTitle: `${blog.title} = ${fullname} Blog`,
    ogDescription: blog.description,
    ogImage: apiUri + useProfile.avatar,
    twitterCard: 'summary_large_image',

})
// END: // SEO and META


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