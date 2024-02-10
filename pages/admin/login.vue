<template>
    <div class="w-screen h-screen max-h-screen max-w-screen overflow-hidden bg-white">
        <div class="w-full h-full grid max-lg:grid-rows-10 lg:grid-cols-2">
            <div class="max-lg:row-span-4 flex flex-col justify-center items-center">
                <indexImagesProgrammer class="w-[125%]" />
            </div>
            <div
                class="max-lg:row-span-6 bg-blue-300 flex flex-col gap-6 lg:gap-12 justify-center items-center px-10 md:px-20 lg:px-20 xl:px-40">
                <!-- nama -->
                <div
                    class="font-josefin-sans border-b-2 border-black py-2 text-nowrap text-3xl md:text-6xl lg:text-4xl xl:text-6xl text-slate-900">
                    Login</div>

                <!-- input email -->
                <div class="w-full font-josefin-sans text-xl md:text-2xl ">
                    <label class=" text-black">Email</label>
                    <input v-model="formData.email" type="text" placeholder="Email"
                        class="input w-full text-slate-800 bg-white" />
                </div>
                <!-- input password -->
                <div class="w-full font-josefin-sans text-xl md:text-2xl">
                    <label class=" text-black">Password</label>
                    <input v-model="formData.password" type="text" placeholder="Password"
                        class="input w-full text-slate-800 bg-white" />
                </div>

                <!-- login button -->
                <button @click="dologin"
                    class="font-semibold btn border-1 text-xl md:text-2xl text-white bg-indigo-800 p-10 md:px-20 lg:px-32 py-2 h-min text-nowrap hover:bg-slate-200 hover:text-slate-800 hover:duration-300">
                    LOGIN NOW</button>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false,
    middleware: ['profile']
})

const { value: useProfile } = useState('profile');
const fullname = `${useProfile.lastName} ${useProfile.firstName}`

const formData = ref({
    email: '',
    password: ''
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;
const dologin = async () => {
    // convert data to json
    const jsonData = JSON.stringify(formData.value);
    console.log

    const response = await $fetch(apiUri + '/login', {
        method: 'POST',
        body: jsonData,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    console.log(response)

    // sementara redirect ke halaman home
    navigateTo('/admin')
};


</script>