<template>
    <div class="flex flex-col gap 4">
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Old Password</div>
            <input v-model="formData.current_password" type="Password" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.current_password">{{ errors.current_password
            }}
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">New Password</div>
            <input v-model="formData.password" type="Password" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.password">{{ errors.password }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Confirm New Password</div>
            <input v-model="formData.confirm_password" type="password" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.confirm_password">{{ errors.confirm_password
            }}
            </div>
        </label>
        <div>
            <!-- The button to open modal -->
            <label for="confirm" class="btn btn-neutral my-5" @click="confirm = true">Update</label>
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

const confirm = ref();
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