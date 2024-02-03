<template>
    <div class="flex flex-col ">
              <div class="font-semibold text-xl group-hover:text-secondary">
                {{ project.title }}
              </div>
              <div>{{ project.readStartDate }} - {{ project.readEndDate }}</div>
            </div>
  
            <!-- Image -->
          <div class="rounded-xl aspect-video overflow-hidden group-hover:scale-105 duration-300">
            <!-- tampilkan foto pertama -->
            <img v-if="project.photos.length" :src="apiUri + project.photos[0].path" :alt="project.title" class="bg-hover">
            <!-- tampilkan dummy -->
            <div v-else class="aspect-video bg-neutral group-hover:scale-110 duration-300"></div>
          </div>
  
          <div class="flex flex-nowrap overflow-hidden gap-2 mt-2">
            <div v-for="skill in project.skills" :key="skill.id" class="boder border-neutral rounded-xl px-3 text-nowrap">
              {{ skill.title }}
            </div>
          </div>
</template>

<script setup>
defineProps({
    project: Object
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

</script>