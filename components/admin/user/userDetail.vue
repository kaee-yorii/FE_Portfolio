<template>
    <div class="flex flex-col gap 4">
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Name</div>
            <input v-model="formData.name" type="text" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.name">{{ errors.name }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Email</div>
            <input v-model="formData.email" type="text" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.email">{{ errors.email }}</div>
        </label>
        <div>
            <!-- The button to open modal -->
            <label for="confirm" class="btn btn-neutral my-5">Update</label>
            <div class="text-error text-sm text-right mr-2">{{ fetchError }}</div>
        </div>
    </div>
</template>

<script setup>
// setup layout & middleware, lihat di /admin/index
import Joi from 'joi';

const AuthStore = useAuthStore();

const errors = ref({});
const fetchError = ref('');

const formData = ref({
    name: AuthStore.user.name,
    email: AuthStore.user.email,
    current_password: '',
    password: '',
    confirm_password: ''
});

const success = ref(false);
const handleUpdate = async () => {
    // reset errors
    errors.value = {}
    fetchError.value = '';

    try {
        await AuthStore.update(formData.value);
        // fetch data update
        success.value = true;
    } catch (error) {
        console.log(error)
        if (error instanceof Joi.ValidationError) {
            errors.value = joiError(error);
        } else {
            // fetch error
            fetchError.value = error.data.message;
        }
    }
}
</script>