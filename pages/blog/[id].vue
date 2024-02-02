<template>
    <div class="max-w-7xl mx-auto">
        <!-- title -->
        <div class="text-4-xl font-semibold">{{ blog.title }}</div>

        <!-- photos -->

        <div>
            <img :src="apiUri + photo.path" :alt="blog.title" v-for="photo in blog.photos" :key="photo">
        </div>

        <!-- content -->
        <div>{{ blog.content }}</div>
    </div>
</template>

<script setup>
const route = useRoute();
const blogID = route.params.id;

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const blog = await $fetch('/api/blog/' + blogID);

// ambil data blog, melalui server nuxt



</script>