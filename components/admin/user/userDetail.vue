<template>
    <div class="flex flex-col gap-2">
        <!--name -->
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Name</div>
            <input v-model="formData.name" type="text" placeholder="Name" class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.name">{{ errors.name }}</div>
        </label>

        <!-- email -->
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Email</span>
            </div>
        </label>

        <input v-model="formData.email" type="text" placeholder="Email"
            class="input input-bordered input-disabled w-full max-w-xs" />
        <div class="text-xs text-right text-error" v-if="errors.email">{{ errors.email }}</div>

        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Update Email</div>
            <input v-model="formData.email" type="text" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.email">{{ errors.email }}</div>
        </label>
    </div>

    <label class="btn btn-secondary text-white grow mt-5 w-[320px]" @click="confirm = true">Submit</label>
    <div class="text-xs text-error" v-if="fetchError">{{ fetchError }}</div>
    <AdminUserModalConfirm :show="confirm" @close="confirm = false" @saved="handleUpdate" />
    <AdminModalSuccess :show="success" @close="success = false" />
</template>

<script setup>
import Joi from 'joi';
const AuthStore = useAuthStore();

const errors = ref({});
const fetchError = ref('');

const formData = ref({
    name: AuthStore.user.name,
    email: AuthStore.user.email
});

const confirm = ref(false);
const success = ref(false);
const handleUpdate = async () => {
    errors.value = {}
    fetchError.value = '';
    success.value = true;

    try {
        console.log('masuk handle update')
        await AuthStore.updateUser(formData.value);
        confirm.value = false;

    } catch (error) {
        console.log('ada error')
        console.log(error)
        confirm.value = false;
        if (error instanceof Joi.ValidationError) {
            // joi error
            errors.value = joiError(error);
        }
        else {
            // fetch error
            fetchError.value = error.data.message;
        }
    }
}
</script>