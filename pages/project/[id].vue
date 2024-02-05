<template>
    <div class="max-w-7xl mx-auto px-4">
        <!-- HEADER -->
        <IndexHeader :title="'Projects'" :url="'/project'" />


        <!-- CONTENT PROJECT -->
        <div class="grid grid-cols-10 gap-6">

            <!-- SISI KIRI  -->
            <div class="col-span-full md:col-span-7">
                <!-- photos -->
                <div v-if="project.photos.length" class="">
                    <Carousel :items-to-show="1.5" :wrapAround="true" :autoplay="3000">
                        <slide v-for="photo in project.photos" :key="photo.id">
                            <div class="aspect-video w-full">
                                <div class="w-full h-full flex justify-centerbg-contain">
                                    <img :src="apiUri + photo.path" :alt="project.title" class="h-full">
                                </div>
                            </div>
                        </slide>

                        <template #addons>
                            <Navigation />
                            <Pagination />
                        </template>
                    </Carousel>
                </div>
                <!-- DUMMY PHOTO -->
                <div v-else class="aspect-video bg-neutral rounded-xl"></div>

                <!-- description, muncul ketika layar besar -->
                <div class="mt-2 max-md:hidden">
                    <div class="my-4 text-justify">{{ project.descripton }}</div>
                </div>
            </div>

            <!-- SISI KANAN -->
            <div class="col-span-full md:col-span-3">
                <!-- DATE DETAIL -->
                <div class="font-light text-sm"><span class="font-semibold">DATE:<span>{{ project.readStartDate }} - {{
                    project.readEndData }}</span></span></div>
                <div><span class="font-semibold">STATUS:</span>{{ status }}</div>
                <!-- COMPANY DETAIL -->
                <div v-if="project.company">
                    <span class="font-semibold">COMPANY:</span> {{ project.company }}
                </div>
                <!-- URL DETAIL -->
                <div v-if="project.url">
                    <span class="font-semibold">Url:</span> <a :href="project.url" target="__blank">{{ project.url }}</a>
                </div>

                <!-- SKILLS -->
                <template v-if="project.skills.length">
                    <div class="font-semibol/d">TECHNOLOGIES:</div>
                    <div class="flex flex-wrap gap-4">
                        <div v-for="skill in project.skills" :key="skill.id"
                            class="badge badge-lg badge-outline badge-accent text-nowrap">
                            <div v-html="skill.svg" class="w-5 mr-2 bg-neutral-100 rounded"></div>
                            {{ skill.title }}
                        </div>
                    </div>
                </template>

                <!-- description, muncul ketika layar kecil -->
                <div class="mt-2 max-md:hidden">
                    <div class="my-text text-justify">{{ project.descripton }}</div>
                </div>

            </div>

        </div>

    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['profile']
})

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


const route = useRoute();
const projectID = route.params.id;

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const project = await $fetch('/api/project/' + projectID);
console.log(project)

const status = computed(() => {
    return project.status.replaceAll('_', '')
})

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