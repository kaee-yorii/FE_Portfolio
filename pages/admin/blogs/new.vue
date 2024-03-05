<template>
    <div>
        <div class="font-semibold">
            <div class="flex items-center gap-2">
                <LucideGraduationCap :size="30" /> Create Blog
            </div>
        </div>

        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Title</div>
            <input v-model="formData.title" type="text" placeholder="Type Here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.title">{{ errors.title }}
            </div>
        </label>

        <div>
            <div class="label label-text pb-0">Photos</div>

            <div class="overflow-auto">
                <!-- loop photo preview -->
                <div class="flex flex-nowrap gap-4 overflow-x-auto">
                    <div v-for="(photo, index) in photo_previews" :src="photo" :key="index"
                        class="min-w-60 aspect-video overflow-hidden rounded bg-neutral/10 justify-center items-center relative">
                        <img :src="photo" class="max-h-full max-w-full">

                        <!-- actions button -->
                        <div class="dropdown dropdown-end absolute right-0 top-0">
                            <div tabindex="0" role="button"
                                class="btn btn-sm px-1 bg-opacity-70 rounded-md m-1 border-0">
                                <LucideMoreVertical :size="16" />
                            </div>
                            <ul tabindex="0"
                                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                                <li>
                                    <button @click="photo_previews.splice(index, 1); file_photos.splice(index, 1)"
                                        class="btn btn-sm my-1 btn-error">
                                        <LucideTrash2 :size="16" />
                                        Remove
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <!-- dummy -->
                <div v-if="!photo_previews.length" class="h-32 lg-h-40 aspect-video rounded bg-neutral"></div>
            </div>

            <input @change="handleFile" multiple accept="image/*" :disabled="photo_previews.length >= 10" type="file"
                class="file-input file-input-bordered w-full max-w-xs" />
        </div>

        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Content</div>
            <textarea v-model="formData.content" class="textarea textarea-bordered" placeholder="content"
                rows="6"></textarea>
            <div class="text-error text-right text-sm" v-if="errors.content">{{ errors.content
                }}
            </div>
        </label>

        <div class="flex justify-end gap-2 my-4">
            <NuxtLink to="/admin/blogs" class="btn">
                Cancel
            </NuxtLink>
            <button @click="showCreateConfirmation = true" class="btn btn-neutral">
                Save
            </button>
        </div>
    </div>

    <!-- modal confirmation -->
    <AdminUserModalConfirm :show="showCreateConfirmation" text_confirm="Save" @close="showCreateConfirmation = false"
        @saved="handleSave">
        Are you sure to save this new blog ?
    </AdminUserModalConfirm>

</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

import Joi from 'joi';

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const errors = ref({
    title: '',
    content: ''
})
const formData = ref({
    title: '',
    content: ''
})

// PHOTO PREVIEW
const photo_previews = ref([]);
const file_photos = [];
const handleFile = (e) => {
    for (const file of e.target.files) {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (photo_previews.value.length < 10) {
                // tampung file
                file_photos.push(file);

                // tampung preview
                photo_previews.value.push(reader.result);
            }
        }
    }

    // reset input file selector
    e.target.value = ''
}

// HANDLE SAVE
const BlogStore = useBlogStore();
const showCreateConfirmation = ref(false);
const fetchError = ref('');
const isLoading = ref(false);
const handleSave = async () => {
    // reset error
    errors.value = {};
    fetchError.value = '';

    // hide confirmation
    showCreateConfirmation.value = false;
    try {
        isLoading.value = true;
        await BlogStore.create(formData.value, file_photos)

        // balik ke halaman
        navigateTo('/admin/blogs')

    } catch (error) {
        isLoading.value = false;

        if (error instanceof Joi.ValidationError) {
            errors.value = joiError(error);
        } else {
            console.log(error);
        }
    }
}
</script>