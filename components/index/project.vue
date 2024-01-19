<template>
  <div class="min-h-screen py-12" id="project">
    <div
      class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2"
    >
      <LucideUserRound :size="16" />
      <div class="uppercase text-sm font-light">Project</div>
    </div>
    <div>
      <div class="mt-10">
        <div class="text-4xl font-semibold">LatestProject</div>
      </div>
      <!-- list projects -->
      <div class="grid grid-cols-2 gap-6 mt-8">
        <!-- PROJECT ITEM -->
        <div class="col-span md:col-span-1 group" v-for="j in 4" :key="j">
          <div class="flex justify-between items-end">
            <div class="font-semibold text-xl group-hover:text-secondary">
              JUDUL PROJECT
            </div>
            <div>20 Jan 2020 - Present</div>
          </div>
          <div class="aspect-video bg-neutral rounded-xl"></div>
          <!-- Image -->
          <div class="flex flex-nowrap gap-2 mt-2 overflow-hidden">
            <div
              v-for="n in 10"
              :key="n"
              class="border border-neutral rounded-xl px-3 text-nowrap"
            >
              Skill {{ n }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
