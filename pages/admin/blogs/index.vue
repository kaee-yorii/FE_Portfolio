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
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

const BlogStore = useBlogStore();

onBeforeMount(async () => {
    await getData();

    console.log('BlogStore.data')
    console.log(BlogStore.data)
    console.log('list blogs')
    console.log(BlogStore.data.data)

    console.log('GETTERS BLOG')
    console.log(BlogStore.blogs)

    console.log('GETTERS LIMIT')
    console.log(BlogStore.limit)

    console.log('GETTERS MAXPAGE')
    console.log(BlogStore.maxPage)

    console.log('GETTERS TOTAL')
    console.log(BlogStore.total)

})

const getData = async () => {
    await BlogStore.get();
}
</script>