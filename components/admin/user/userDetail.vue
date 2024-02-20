<template>
    <div class="flex flex-col gap-4">
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
    <label class="btn grow mt-3 w-[320px]" for="confirm">Submit</label>
    <div class="text-xs text-error" v-if="fetchError">{{ fetchError }}</div>
    <AdminUserModalConfirm :show="confirm" @close="false" />
    <AdminModalSuccess />


    <!-- modal -->
    <input type="checkbox" id="confirm" class="modal-toggle">
    <div class="modal" role="dialog">
        <div class="modal-box">
            <form method="dialog">
                <label for="confrim" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">x</label>
            </form>
        </div>
        <h3 class="font-bold text-lg">Confirm To Processed</h3>
        <p class="py-4">Are You Sure?</p>
        <div class="modal-action">
            <label for="confirm" class="btn text-white btn-error">Cancel</label>
            <label for="confirm" class="btn text-white btn-success" @click="handleUpdate">Yes Update!</label>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <label for="confirm">Close</label>
    </form>
</template>

<script setup>
import Joi from 'joi';
const AuthStore = useAuthStore();

const errors = ref({});
const fetchError = ref('');
const confirm = ref(false)

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
    success.value = false;
    confirm = false;

    try {

        console.log('masuk handle update')
        await AuthStore.updateUser(formData.value);
        success.value = true;

    } catch (error) {
        console.log('ada error')
        console.log(error)

        if (error instanceof Joi.ValidationError) {
            // joi error
            errors.value = joiError(error);
        }
        else {
            // fetch error
            fetchError.value = error.data.message;
        }
    }
};
</script>