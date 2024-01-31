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
        <div class="col-span md:col-span-1 group" v-for="(project, i) in projects " :key="i">
          <div class="flex justify-between items-end">
            <div class="font-semibold text-xl group-hover:text-secondary">
              {{ project.title }}
            </div>
            <div>{{ project.readStartDate }} - {{ project.readEndDate }}</div>
          </div>

          <!-- Image -->
        <div class="rounded-xl aspect-video overflow-hidden group-hover:scale-105 duration-300">
          <!-- tampilkan foto pertama -->
          <img v-if="project.photos.length" :src="apiUri + project.photos[0].path" :alt="project.title">
          <!-- tampilkan dummy -->
          <div v-else class="aspect-video bg-neutral group-hover:scale-110 duration-300"></div>
        </div>

        <div class="flex flex-nowrap overflow-hidden gap-2 mt-2">
          <div v-for="skill in project.skills" :key="skill.id" class="boder border-neutral rounded-xl px-3 text-nowrap">
            {{ skill.title }}
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    projects : Array
  });

  const config = useRuntimeConfig();
  const apiUri = config.public.apiUri;

  console.log(props.projects)
</script>