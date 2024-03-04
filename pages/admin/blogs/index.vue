<template>
    <div>
        <div class="font-semibold text-lg mb-4 border-b-neutral/25 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideGraduationCap :size="26" />
                Blog
            </div>
            <button class="btn btn-sm btn-neutral">
                <LucidePlus :size="16" />
                Add Blog
            </button>
        </div>

        <div class="flex justify-between">
            <input @keyup type="text" placeholder="Type here"
                class="input input-sm input-bordered w-full max-w-xs" />
            <div class="join mb-2">
                <button class="join-item  btn btn-sm" @click="prevPage">«</button>
                <button class="join-item  btn btn-sm">Page {{ page }}</button>
                <button class="join-item  btn btn-sm" @click="nextPage">»</button>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-6">
            <div v-for="blog in BlogStore.blogs" :key="blog.id" class="card card-compact bg-base-100 shadow-xl">
                <figure>
                    <!-- kalau ada foto minimal 1 -->
                    <img v-if="blog.photos.length" :src="apiUri + blog.photos[0].path" />

                    <!-- dummy photo -->
                    <div v-else class="bg-neutral/20 aspect-video w-full"></div>
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ blog.title }}</h2>
                    <p class="line-clamp-2 xl:line-clamp-3 ">{{ blog.content }}</p>
                </div>
            </div>

            <div class="flex justify-end mt-2">
            <div class="join mb-2">
                <button class="join-item  btn btn-sm" @click="prevPage">«</button>
                <button class="join-item  btn btn-sm">Page {{ page }}</button>
                <button class="join-item  btn btn-sm" @click="nextPage">»</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const BlogStore = useBlogStore();

onBeforeMount(async () => {
    await getData();
})

const prevPage = async () => {
    if (page.value != 1) {
        // kurangi 1
        page.value = page.value - 1;

        // fetch ulang
        await getData();
    }
}

const nextPage = async () => {
    // page != BlogStore.maxPage ? 
    if (page.value != BlogStore.maxPage) {
        // tambah 1
        page.value = page.value + 1;

        // fetch ulang
        await getData();
    }
}

const page = ref(1);

const getData = async () => {
    await BlogStore.get(page.value);
}

watchEffect(() => {
    console.log(page.value)
})
</script>