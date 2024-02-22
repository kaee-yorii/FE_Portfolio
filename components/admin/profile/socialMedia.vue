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

    <!-- MODAL CONFIRMATION -->
    <div class="flex items-center gap-2">
        <label class="btn btn-neutral text-white mt-5 w-[320px]" @click="confirm = true">
            Save Changes
            <span v-show="isLoading" class="loading loading-spinner loading-md"></span>
        </label>
        <div class="text-xs text-error" v-if="fetchError">{{ fetchError }}</div>
    </div>

    <AdminUserModalConfirm :show="confirm" @close="confirm = false" @saved="handleUpdate">
        <h3 class="font-bold text-lg">Confirm To Processed</h3>
        <p class="py-4">Are You Sure To Update?</p>
    </AdminUserModalConfirm>

    <!-- MODAL SUCCESS -->
    <AdminModalSuccess :show="success" @close="success = false" />
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
const success = ref(false);
const confirm = ref(false);

const errors = ref({});
const handleUpdate = async () => {
    // TODO confirmation, alert success

    // loading indicator
    if (isLoading.value == false) {
        isLoading.value == true;

        // reset error
        errors.value = {};
        fetchError.value = '';

        confirm.value = true;

        try {
            await ProfileStore.update(formData.value);
            isLoading.value = false;
            success.value = true;
        } catch (error) {
            isLoading.value = false;
            if (error instanceof Joi.ValidationError) {
                errors.value = joiError(error);
            } else {
                fetchError.value = error.data.message;
            }
        }
    }
}
</script>
