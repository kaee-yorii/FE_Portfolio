<template>
    <!-- <div class="w-screen h-screen max-h-screen max-w-screen overflow-hidden bg-white"> -->
    <!-- <div class="w-full h-full flex"> -->
    <!-- <div class="max-lg:row-span-4 flex flex-col justify-center items-center">
                <IndexImagesWhale class="w-[80%]" />
            </div> -->
    <div
        class="w-screen h-screen max-lg:row-span-6 bg-gradient-to-r from-blue-300 via-cyan-200 to-pink-200  flex gap-6 lg:gap-12 justify-center items-center px-10 md:px-20 lg:px-20 xl:px-40">

        <!-- nama -->
        <div class="bg-gradient-to-r from-slate-300 to-transparent rounded-2xl p-3 md:p-8 max-lg:p-12 lg:p-16">
            <div
                class="font-josefin-sans text-center pb-5 text-nowrap text-3xl md:text-6xl lg:text-4xl xl:text-6xl text-slate-800">
                Login
            </div>

            <!-- input email -->
            <div class="w-full py-5 font-josefin-sans text-xl md:text-2xl ">
                <label class=" text-black">Email</label>
                <input v-model="formData.email" type="text" placeholder="Email"
                    class="input w-full text-slate-800 bg-white" />

                <!-- error message -->
                <div class="text-error text-sm text-right mr-2 mt-2" v-if="errorMessages.email">{{
                    errorMessages.email }}
                </div>
            </div>
            <!-- input password -->
            <div class="w-full pt-7 pb-14 font-josefin-sans text-xl md:text-2xl">
                <label class=" text-black">Password</label>
                <input v-model="formData.password" type="password" placeholder="Password"
                    class="input w-full text-slate-800 bg-white" />

                <!-- error message -->
                <div class="text-error text-sm text-right mr-2 mt-2" v-if="errorMessages.password">{{
                    errorMessages.password }}</div>
            </div>

            <!-- login button -->
            <div class="flex items-center gap-2">
                <button @click="handleLogin"
                    class="font-semibold btn border-1 text-xl md:text-2xl text-white bg-slate-800 p-10 md:px-20 lg:px-32 py-2 h-min text-nowrap hover:bg-slate-200 hover:text-slate-800 hover:duration-300">
                    SUBMIT
                    <span v-show="isLoading" class="loading loading-spinner loading-md"></span>
                    <!-- <IndexImagesLoading class="w-12" v-if="isLoading" /> -->
                </button>
            </div>
            <div class="text-error text-sm text-right mr-2 mt-2">{{ fetchError }}</div>
        </div>

    </div>
    <!-- </div> -->
    <!-- </div> -->
</template>

<script setup>
import Joi from 'joi';

definePageMeta({
    layout: false,
    middleware: ['profile', 'auth']
})

const { value: useProfile } = useState('profile');
const fullname = `${useProfile.lastName} ${useProfile.firstName}`

const formData = ref({
    email: '',
    password: ''
});

// AUTH STATE / PINIA
const AuthStore = useAuthStore();

const errorMessages = ref({});
const fetchError = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
    // halangi jika dengan loading
    if (isLoading.value) return;

    // reset error message
    errorMessages.value = {};
    fetchError.value = '';
    isLoading.value = true;

    try {
        // fetch login
        await AuthStore.login(formData.value);
        isLoading.value = false;

    } catch (error) {

        if (error instanceof Joi.ValidationError) {
            errorMessages.value = joiError(error);
        } else {
            fetchError.value = error.data.message;
        }

        isLoading.value = false;
    }
}
</script>