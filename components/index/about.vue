<template>
  <div class="min-h-screen py-12 flex flex-col" id="about">
    <div
      class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2"
    >
      <LucideUserRound :size="16" />
      <div>About</div>
    </div>
    <div class="flex flex-col gap-6 mt-10 grow">
      <div class="text-6xl">
        Say Hi from <span class="text-secondary">{{ profile.lastName }}</span>, Webflow Designer
        and Developer
      </div>
      <div class="text-4xl font-semibold">
        Every great design with an even better story
      </div>
      <div class="font-light">
        {{ profile.bio }}
      </div>
      <div class="flex items-end gap-20 pb-10 grow">
        <div>
          <div class="text-4xl font-bold text-secondary">{{ profile.year_of_experience }}+</div>
          <div class="font-semibold">YEARS OF<br />EXPERIENCE</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-secondary">{{ profile.count_project }}+</div>
          <div class="font-semibold">PROJECTS<br />COMPLETED</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profile: Object
})
</script>