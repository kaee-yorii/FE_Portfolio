<template>
  <div class="min-h-screen py-12" id="resume">
    <div class="rounded-2xl border border-neutral w-fit px-4 py-1">
      <LucideUserRound :size="16" />
      <div class="uppercase text-sm font-light">Project</div>
    </div>
    <div>
      <div>
        <div>LatestProject</div>
      </div>
      <!-- list projects -->
      <div class="grid grid-cols-2 gap-6 mt-8">
        <!-- PROJECT ITEM -->
        <div class="col-span md:col-span-1" v-for="j in 4" :key="j">
          <div class="flext justify-between items-end">
            <div>JUDUL PROJECT</div>
            <div>20 Jan 2020 - Present</div>
          </div>
          <div class="aspect-video bg-neutral rounded-xl"></div>
          <div class="flex flex-wrap gap-2 mt-2">
            <div
              v-for="n in 10"
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
