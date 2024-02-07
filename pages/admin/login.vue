<template>
    <div class="w-screen h-screen max-h-screen max-w-screen overflow-hidden bg-white">
        <div class="w-full h-full grid max-lg:grid-rows-2 lg:grid-cols-2">
            <div class="flex flex-col justify-center items-center">
                <indexImagesProgrammer class="w-[125%]" />
            </div>
            <div
                class="bg-[#EDD6D6] flex flex-col gap-6 lg:gap-12 justify-center items-center px-10 md:px-20 lg:px-20 xl:px-40">
                <!-- nama -->
                <div class="font-bungee-shade text-nowrap text-3xl md:text-6xl lg:text-4xl xl:text-6xl">{{ fullname }}</div>

                <!-- input email -->
                <div class="w-full font-arc-daughter text-xl md:text-2xl ">
                    <label>Email</label>
                    <input type="text" placeholder="Email" class="input w-full bg-[#D3C7C7]" />
                </div>
                <!-- input password -->
                <div class="w-full font-arc-daughter text-xl md:text-2xl">
                    <label>Password</label>
                    <input type="text" placeholder="Password" class="input w-full bg-[#D3C7C7]" />
                </div>

                <!-- login here -->
                <button class="font-baloo-bhai btn border-0 text-xl md:text-2xl bg-[#D3C7C7]">LOGIN NOW</button>
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
</script>