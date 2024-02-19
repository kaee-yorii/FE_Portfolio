<template>
    <div class="font-semibold mb-4 border-b-neutral/25">USER SETTING</div>

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
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Current Password</div>
            <input v-model="formData.current_password" type="Password" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.current_password">{{ errors.current_password }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Password</div>
            <input v-model="formData.password" type="Password" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.password">{{ errors.password }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Confirm Password</div>
            <input v-model="formData.confirm_password" type="password" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.confirm_password">{{ errors.confirm_password }}</div>
        </label>
    </div>

    <div>
        <!-- The button to open modal -->
        <label for="confirm" class="btn btn-neutral my-5">Update</label>
        <div class="text-error text-sm text-right mr-2">{{ fetchError }}</div>
    </div>


    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="confirm" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <form method="dialog">
                <label for="confirm" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">×</label>
            </form>
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Are You Sure?</p>
            <div class="modal-action">
                <label for="confirm" class="btn">No !</label>
                <label for="confirm" @click="handleUpdate" class="btn btn-neutral">Update</label>
            </div>

        </div>
        <!-- click outside -->
        <form method="dialog" class="modal-backdrop">
            <label for="confirm">close</label>
        </form>
    </div>
</template>

<script setup>
// setup layout & middleware, lihat di /admin/index
import Joi from 'joi';
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

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

const handleUpdate = async () => {
    // reset errors
    errors.value = {}
    fetchError.value = '';

    try {
        await AuthStore.update(formData.value);
        // fetch data update
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