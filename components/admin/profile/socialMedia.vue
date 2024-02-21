<template>
    <!-- github -->
    <label class="form-control w-full max-w-xs">
        <div class="label label-text">Github</div>
        <input v-model="formData.github" type="text" placeholder="Github" class="input input-bordered w-full max-w-xs" />
        <div class="text-error text-right text-sm" v-if="errors.github">{{ errors.github }}</div>
    </label>
    <!-- instagram -->
    <label class="form-control w-full max-w-xs">
        <div class="label label-text">Instagram</div>
        <input v-model="formData.instagram" type="text" placeholder="Instagram"
            class="input input-bordered w-full max-w-xs" />
        <div class="text-error text-right text-sm" v-if="errors.instagram">{{ errors.instagram }}</div>
    </label>
    <!-- facebook -->
    <label class="form-control w-full max-w-xs">
        <div class="label label-text">Facebook</div>
        <input v-model="formData.facebook" type="text" placeholder="Facebook"
            class="input input-bordered w-full max-w-xs" />
        <div class="text-error text-right text-sm" v-if="errors.facebook">{{ errors.facebook }}</div>
    </label>
    <!-- twitter -->
    <label class="form-control w-full max-w-xs">
        <div class="label label-text">Twitter</div>
        <input v-model="formData.twitter" type="text" placeholder="Twitter" class="input input-bordered w-full max-w-xs" />
        <div class="text-error text-right text-sm" v-if="errors.twitter">{{ errors.twitter }}</div>
    </label>
    <!-- linkedin -->
    <label class="form-control w-full max-w-xs">
        <div class="label label-text">Linkedin</div>
        <input v-model="formData.linkedin" type="text" placeholder="Linkedin"
            class="input input-bordered w-full max-w-xs" />
        <div class="text-error text-right text-sm" v-if="errors.linkedin">{{ errors.linkedin }}</div>
    </label>
    <!-- discord -->
    <label class="form-control w-full max-w-xs">
        <div class="label label-text">Discord</div>
        <input v-model="formData.discord" type="text" placeholder="Discord" class="input input-bordered w-full max-w-xs" />
        <div class="text-error text-right text-sm" v-if="errors.discord">{{ errors.discord }}</div>
    </label>

    <button class="btn btn-neutral float-right-1 py-2">Update</button>
</template>

<script setup>

const ProfileStore = useProfileStore();

const errors = ref({});
const formData = ref({
    github: ProfileStore.profile.github,
    instagram: ProfileStore.profile.instagram,
    facebook: ProfileStore.profile.facebook,
    twitter: ProfileStore.profile.twitter,
    linkedin: ProfileStore.profile.linkedin,
    discord: ProfileStore.profile.discord
});
</script>
