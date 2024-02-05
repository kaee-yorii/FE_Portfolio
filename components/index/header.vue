<template>
    <div class="flex justify-between items-end my-4 border-b border-b-neutral pt-10 pb-3">
        <div class="text-4xl font-bold">{{ fullname }}</div>
        <NuxtLink :to="url" class="text-xl font-bold">{{ title }}</NuxtLink>
    </div>
</template>

<script setup>

defineProps({
    title: String,
    url: String
});

// get data profile from state
const useProfile = useState('profile');
const profile = await $fetch('/api/profile');
const fullname = computed(() => {
    return `${profile.firstName} ${profile.lastName}`
});

</script>
