<template>
  <div class="min-h-screen py-12" id="education">
    <div
      class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2"
    >
      <LucideUserRound :size="16" />
      <div class="uppercase text-sm font-light">Education</div>
    </div>
    <div class="flex flex-col gap-6 mt-10">
      <div class="text-4xl font-semibold">Education</div>
      <div>
        <!-- list experience -->
        <div class="flex gap-12 group" v-for="(edu, i) in educations" :key="i">
          <div class="flex flex-col items-center">
            <LucideCircle
              :size="12"
              class="fill-neutral stroke-secondary-content group-hover:fill-secondary"
            />
            <div class="grow w-px bg-neutral"></div>
          </div>
          <div class="mb-10">
            <div class="group-hover:text-secondary">{{ edu.startDate }} - {{ edu.endDate ? edu.endDate : 'Present' }}</div>
            <div class="flex flex-col gap-4">
              <div>
                <div
                  class="text-2xl md:text-3xl xl:text-4xl font-semibold mt-5"
                >
                  Framer Designer & Developer
                </div>
                <div class="text-light">{{ edu.title }}</div>
              </div>
              <div>
                <div class="text-2xl md:text-3xl xl:text-4xl font-semibold">
                  {{ edu.intuitionName }}
                </div>
                <div class="font-light">{{ edu.degree }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  educations: Array
</script>