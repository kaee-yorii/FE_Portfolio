<template>
  <div class="min-h-screen py-12" id="experience">
    <div class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2">
      <LucideUserRound :size="16" />
      <div class="uppercase text-sm font-light">Experience</div>
    </div>
    <div class="flex flex-col gap-6 mt-10">
      <div class="text-4xl font-semibold">Experience</div>
      <div>
        <!-- list experience -->
        <div class="flex gap-12 group" v-for="(exp, i) in experiences" :key="i">
          <div class="flex flex-col items-center">
            <LucideCircle :size="12" class="fill-neutral stroke-secondary-content group-hover:fill-secondary" />
            <div class="grow w-px bg-neutral"></div>
          </div>
          <div class="mb-10">
            <div class="group-hover:text-secondary">{{ exp.startYear }} - {{ exp.endYear ? exp.endYear : 'Present' }}
            </div>
            <div class="flex flex-col gap-4">
              <div>
                <div class="text-2xl md:text-3xl xl:text-4xl font-semibold mt-5">
                  {{ exp.company }}
                </div>
                <div class="text-light">{{ exp.title }}</div>
              </div>
              <div>
                <div class="text-2xl md:text-3xl xl:text-4xl font-semibold">
                  {{ exp.decription }}
                </div>
                <div class="font-light">{{ exp.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  experiences: Array
})
</script>