<template>
    <div>
        <div class="flex flex-col gap-2">
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Old Password</div>
                <input v-model="formData.current_password" type="Password" class="input input-bordered w-full max-w-xs" />
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

        <div class="flex items-center gap-2">
            <label class="btn btn-secondary text-white mt-5 w-[320px]" @click="confirm = true">
                Save Changes
                <span v-show="isLoading" class="loading loading-bars loading-md"></span>
            </label>
            <div class="text-xs text-error" v-if="fetchError">{{ fetchError }}</div>
        </div>

        <AdminUserModalConfirm :show="confirm" text_confirm="Change Password" @close="confirm = false"
            @saved="handleUpdate">
            <h3 class="font-bold text-lg">Confirm To Processed</h3>
            <p class="py-4">Are You Sure To Change Password?</p>
        </AdminUserModalConfirm>
        <AdminModalSuccess :show="success" @close="success = false" />
    </div>
</template>

<script setup>
import Joi from 'joi';
const AuthStore = useAuthStore();

const errors = ref({});
const fetchError = ref('');
const confirm = ref(false);
const success = ref(false);
const isLoading = ref(false);

const formData = ref({
    current_password: '',
    password: '',
    confirm_password: ''
});

const handleUpdate = async () => {
    errors.value = {}
    fetchError.value = '';
    confirm.value = true;
    isLoading.value = true;

    try {
        console.log('masuk handle update')

        await AuthStore.updateUser(formData.value);
        success.value = true;
        isLoading.value = false;

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