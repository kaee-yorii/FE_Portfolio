<template>
    <div>

        <div class="flex flex-col gap 4">
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Old Password</div>
                <input v-model="formData.current_password" type="Password" placeholder="Type here"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.current_password">{{ errors.current_password
                }}
                </div>
            </label>

            <!-- password -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">New Password</div>
                <input v-model="formData.password" type="Password" placeholder="Type here"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.password">{{ errors.password }}</div>
            </label>

            <!-- confirm password -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Confirm New Password</div>
                <input v-model="formData.confirm_password" type="password" placeholder="Confirm Password"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.confirm_password">{{ errors.confirm_password
                }}
                </div>
            </label>
        </div>

        <label class="btn grow mt-3 w-[320px]" @click="confirm = true">Submit</label>
        <div class="text-xs text-error" v-if="fetchError">{{ fetchError }}</div>
        <AdminUserModalConfirm :show="confirm" @close="confirm = false" />
    </div>
</template>

<script setup>
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
    errors.value = {}
    fetchError.value = '';
    success.value = false;

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
}
</script>