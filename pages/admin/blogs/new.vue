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
            <div class="label label-text pbto">Photos</div>

            <div class="overflow-auto">
                <div class="flex flex-nowrap gap-4">
                    <img v-for="photo in photo_previews" :src="photo" :key="photo"
                        class="h-40 aspect-video rounded bg-neutral/20">
                </div>

                <div v-if="!photo_previews.length" class="h-32 lg-h-40 aspect-video rounded bg-neutral"></div>
            </div>

            <input @change="handleFile" accept="image/*" type="file"
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
            <button class="btn btn-neutral">
                Save
            </button>
        </div>

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

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

const photo_previews = ref([]);

const handleFile = (e) => {
    for (const file of e.target.files) {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            photo_previews.value.push(reader.result);
        }
    }
}

watchEffect(() => {
    console.log(photo_previews.value)
})
</script>