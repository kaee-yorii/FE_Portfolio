<template>
    <div>
        <div class="font-semibold text-lg mb-4 border-b-neutral/25 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideAlbum :size="26" />
                Blog
            </div>
            <NuxtLink to="/admin/blogs/new" @click="editData = null; showForm = true" class="btn btn-sm btn-neutral">
                <LucidePlus :size="16" />
                Add Blog
            </NuxtLink>
        </div>

        <div class="flex max-sm:flex-col max-sm:items-end sm:justify-between gap-2">
            <input @keyup.enter="page = 1; getData()" v-model="filter" type="text" placeholder="Cari apa ?"
                class="input input-sm input-bordered w-full max-w-xs" />
            <div class="join mb-2">
                <button class="join-item  btn btn-sm" @click="prevPage">«</button>
                <button class="join-item  btn btn-sm">Page {{ page }} of {{ BlogStore.maxPage }}</button>
                <button class="join-item  btn btn-sm" @click="nextPage">»</button>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="blog in BlogStore.blogs" :key="blog.id"
                class="card card-compact bg-base-100 shadow-xl overflow-hidden relative">
                <div class="lg:hidden dropdown dropdown-end absolute right-0 top-0">
                    <div tabindex="0" role="button" class="btn btn-sm px-1 bg-opacity-70 rounded-md m-1 border-0">
                        <LucideMoreVertical :size="16" />
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                        <li>
                            <NuxtLink :to="`/admin/blogs/update?id=${blog.id}`" class="btn btn-sm my-1">
                                <LucidePencilLine :size="16" />
                                Edit
                            </NuxtLink>
                        </li>
                        <li>
                            <button @click="removeData = blog; show_remove_modal = true"
                                class="btn btn-sm my-1 btn-error">
                                <LucideTrash2 :size="16" />
                                Remove
                            </button>
                        </li>
                    </ul>
                </div>

                <figure>
                    <!-- kalau ada foto minimal 1 -->
                    <img v-if="blog.photos.length" :src="apiUri + blog.photos[0].path" />

                    <!-- dummy photo -->
                    <div v-else class="bg-neutral/20 aspect-video w-full"></div>
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ blog.title }}</h2>
                    <p class="line-clamp-2 xl:line-clamp-3 ">{{ blog.content }}</p>

                    <div class="max-lg:hidden flex gap-2 justify-end">
                        <NuxtLink :to="`/admin/blogs/update?id=${blog.id}`" class="btn btn-xs xl:btn-md my-1 pr-2">
                            <LucidePencilLine :size="16" />
                            Edit
                        </NuxtLink>
                        <button @click="removeData = blog; show_remove_modal = true"
                            class="btn btn-xs xl:btn-md my-1 btn-error">
                            <LucideTrash2 :size="16" />
                            Remove
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <div v-if="BlogStore.blogs.length == 0" class="flex flex-col items-center py-28">
            <LucideShieldAlert :size="96" />
            <span class="font-semibold py-4">Data is not found</span>
        </div>

        <div class="flex justify-end mt-2">
            <div class="join mb-2">
                <button class="join-item  btn btn-sm" @click="prevPage">«</button>
                <button class="join-item  btn btn-sm">Page {{ page }} of {{ BlogStore.maxPage }}</button>
                <button class="join-item  btn btn-sm" @click="nextPage">»</button>
            </div>
        </div>

        <AdminUserModalConfirm :show="show_remove_modal" text_confirm="Remove" @close="show_remove_modal = false"
            @saved="handleRemove">
            are you sure to remove
            <span v-if="removeData" class="font-bold">{{
                    removeData.title }} ?</span>
        </AdminUserModalConfirm>

        <AdminModalSuccess :show="show_success_modal" @close="show_success_modal = false" />

        <!-- <AdminExperienceForm :data="editData" :show="showForm" @close="showForm = false" @saved="saved" /> -->

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const editData = ref(null);

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
const filter = ref('')

const getData = async () => {
    await BlogStore.get(page.value, filter.value);
}

// REMOVE
const show_success_modal = ref(false);
const show_remove_modal = ref(false);
const removeData = ref(null);
const handleRemove = async (id) => {

    if (!removeData.value) return;

    try {
        // do remove
        await BlogStore.remove(removeData.value.id);

        // tutup konfirmasi
        show_remove_modal.value = false;
        // tampilkan alert sukses
        show_success_modal.value = true;

        // load ulang data
        await getData();
    } catch (error) {
        console.log(error);
    }
}
</script>