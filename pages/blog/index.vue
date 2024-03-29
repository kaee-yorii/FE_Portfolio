<template>
    <div class="max-w-7xl mx-auto px-4">
        <!-- HEADER -->
        <IndexHeader :title="'Blogs'" :url="'/blog'" />

        <template v-if="blogs">
            <!-- PAGINATION TOP -->
            <div class="flex max-md:flex-col justify-between md:items-end">
                <div class="max-md:w-full text-4xl font-semibold my-2">My Latest <span class="text-accent">Blogs</span>
                </div>
                <div class="join my-2">
                    <button class="join-item btn" :class="{ 'btn-disabled': page == 1 }" @click="page--">«</button>
                    <button class="join-item btn">Page {{ page }}</button>
                    <button class="join-item btn" :class="{ 'btn-disabled': page == maxPage }" @click="page++">»</button>
                </div>
            </div>

            <!-- LOOP DATA BLOGS -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-5">
                <NuxtLink :to="'/blog/' + blog.id" v-for="blog in blogs.data" :key="blog.id" class="w-full group">
                    <div class="text-accent text-xl font-bold">{{ blog.title }}</div>
                    <div class="text-sm font-light">{{ blog.shortDateTime }}</div>
                    <div class="group-hover:scale-105 duration-300 mt-1">
                        <!-- image data -->
                        <img v-if="blog.photos.length" :src="apiUri + blog.photos[0].path" alt=""
                            class="w-full aspect-video rounded-xl">
                        <!-- image dummy -->
                        <div v-else class="w-full aspect-video bg-neutral rounded-xl"></div>
                        <div class="line-clamp-2 font-light">{{ blog.content }}</div>
                    </div>
                </NuxtLink>
            </div>

            <!-- PAGINATION BOTTOM -->
            <div class="flex justify-end items-end my-5">
                <div class="join my-2">
                    <button class="join-item btn" :class="{ 'btn-disabled': page == 1 }" @click="page--">«</button>
                    <button class="join-item btn">Page {{ blogs.page }}</button>
                    <button class="join-item btn" :class="{ 'btn-disabled': page == maxPage }" @click="page++">»</button>
                </div>
            </div>
        </template>

    </div>
</template>

<script setup>
//disesuaikan value berdasarkan nama file di folder middleware
definePageMeta({
    middleware: ['profile']
})

// SEO and META
const { value: useProfile } = useState('profile');
const fullname = `${useProfile.lastName} ${useProfile.firstName}`
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

useSeoMeta({
    title: useProfile.lastName + ' Blogs !',
    description: useProfile.bio,
    ogTitle: fullname + ' Blogs !',
    ogDescription: useProfile.bio,
    ogImage: apiUri + useProfile.avatar,
    twitterCard: 'summary_large_image',

})
// END: // SEO and META

// ambil data blogs melalui server nuxt
const blogs = ref(null);
const maxPage = ref(1);
const page = ref(1);

const fetchData = async () => {
    blogs.value = await $fetch('/api/blog?page=' + page.value);
    maxPage.value = blogs.value.maxPage;
}

// registration on before mount
onBeforeMount(async () => {
    await fetchData();
});

// watch effect
watchEffect(async () => {
    await $fetch('/api/blog?page=' + page.value);
});

</script>