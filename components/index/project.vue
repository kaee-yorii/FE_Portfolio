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
        <div class="text-4xl font-semibold">Latest Project</div>
      </div>

      <!-- list projects -->
      <div class="grid grid-cols-2 gap-6 mt-8">
        <!-- PROJECT ITEM -->
          
          <NuxtLink :to="'/project/' + project.id" v-for="(project, i) in projects" :key="i" class="w-full group'">
            <IndexProjectThumbnail :project="project"/>
        </NuxtLink>

          </div>
        </div>

      <NuxtLink to="/project" class="btn btn-accent w-min truncate px-8 justify-center items-center">See All Projects</NuxtLink>

    </div>


</template>

<script setup>
  defineProps({
    projects: Array
  });
  
</script>