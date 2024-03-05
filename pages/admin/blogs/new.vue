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

const errors = ref({
    title: '',
    content: ''
})
const formData = ref({
    title: '',
    content: ''
})
</script>