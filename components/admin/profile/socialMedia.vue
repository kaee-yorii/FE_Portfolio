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

    <div class="flex items-center gap-2 mt-5">
        <button @click="handleUpdate" class="btn btn-neutral float-right">
            Save Changes
            <span v-show="isLoading" class="loading loading-spinner loading-md"></span>
        </button>
        <div class="text-error text-tight text-sm pr-2">{{ fetchError }}</div>
    </div>
</template>

<script setup>
import Joi from 'joi';
const ProfileStore = useProfileStore();

const formData = ref({
    github: ProfileStore.profile.github,
    instagram: ProfileStore.profile.instagram,
    facebook: ProfileStore.profile.facebook,
    twitter: ProfileStore.profile.twitter,
    linkedin: ProfileStore.profile.linkedin,
    discord: ProfileStore.profile.discord
});

const fetchError = ref('');
const isLoading = ref(false);

const errors = ref({});
const handleUpdate = async () => {
    // TODO confirmation, alert success

    // reset error
    errors.value = {};
    fetchError.value = '';
    isLoading.value = true;

    try {
        await ProfileStore.update(formData.value);
        isLoading.value = false;
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            errors.value = joiError(error);
        } else {
            fetchError.value = error.data.message;
        }
    }
}
</script>
