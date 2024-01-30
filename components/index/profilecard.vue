<template>
  <div
    class="md:fixed min-h-screen md:flex md:items-center md:w-[38%] lg:w-[32%] xl:w-[25%]"
  >
    <div
      class="border border-neutral rounded-3xl p-12 w-full flex flex-col gap-6"
    >
      <!-- NAME & TITLE -->

      <div class="flex justify-between items-end">
        <div class="text-3xl font-bold">{{ fullName }}</div>
        <div class="text-right">{{ profile.job }}</div>
      </div>
      <!-- IMAGE / FOTO -->

      <div v-if="profile.avatar" class="aspect-square rounded-2xl overflow-hidden">
        <img :src="apiUri + profile.avatar" alt="fullName" class="object-cover min-h-full min-w-full">
      </div>
      <div v-else class="aspect-square bg-neutral rounded-2xl"></div>
      <!-- <div class="aspect-square bg-neutral rounded-2xl"></div> -->
      <!-- EMAIL & LOKASI -->
      <div class="text-2xl font-semibold text-center">
        <div>{{ profile.email }}</div>
        <div>{{ profile.city }}, {{ profile.country }}</div>
      </div>
      <!-- COPYRIGHT -->
      <div class="text-center font-thin text-slate-400">
        &copy; {{ year }} {{ profile.lastName }}, All Rights Reserved
      </div>
      <!-- SOCIAL BUTTON -->
      <div class="flex justify-between">
        <a v-if="profile.instagram" :href="profile.instagram" target="__blank"
          class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary"
        >  
        <LucideInstagram :size="20" class="text-secondary" />
        </a>

        <a v-if="profile.twitter" :href="profile.twitter" target="__blank"
          class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary"
        >
          <LucideTwitter :size="20" class="text-secondary" />
        </a>

        <a v-if="profile.github" :href="profile.github" target="__blank"
          class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary"
        >
          <LucideGithub :size="20" class="text-secondary" />
        </a>

        <a v-if="profile.facebook" :href="profile.facebook" target="__blank"
          class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary"
        >
          <LucideFacebook :size="20" class="text-secondary" />
        </a>
      </div>
      <!-- HIRE ME BUTTON -->
      <button
        class="btn btn-secondary text-default hover:text-secondary hover:bg-transparent w-full rounded-2xl"
      >
        <LucideMail />
        <div>HIRE ME</div>
      </button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  profile: Object
});

// computed fullName
const fullName = computed(() => {
  return `${props.profile.firstName} ${props.profile.lastName}`
  // return props.profile.firstName + ' ' + props.profile.lastName
})

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const year = new Date().getFullYear();
</script>
