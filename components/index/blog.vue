<template>
  <div class="min-h-screen py-12" id="blog">
    <div
      class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2"
    >
      <LucideAlbum :size="16" />
      <div class="uppercase text-sm font-light">BLOG</div>
    </div>
    <div class="flex flex-col gap-6 mt-10">
      <div class="text-4xl font-semibold">Latest Blog</div>

      <!-- LIST BLOG -->
      <a :href="'/blog/' + blog.id"
        class="grid grid-cols-10 gap-3 group hover:bg-secondary p-2 rounded-xl"
        v-for="(blog, i) in blogs"
        :key="i"
      >
        <!-- IMAGE -->
        <div class="col-span-4 xl:col-span-3 rounded-lg">
          <div  v-if="!blog.photos.length"
            class="
            aspect-video bg-neutral  group-hover:scale-105 duration-300"
          ></div>

          <!-- photo pertama -->
          <img v-else :src="apiUri + blog.photos[0].path" alt="blog.title" class="bg-hover">

        </div>
        <div class="group col-span-6 xl:col-span-7">
          <!-- TITLE -->
          <div class="flex-none text-2xl font-semibold group-hover:text-accent">
            {{ blog.title }}
          </div>
          <div class="grow font-light line-clamp-2 xl:line-clamp-3">
            {{ blog.content }}
          </div>
          <!-- CREATED AT -->
          <div class="pb-10 grow flex-none text-xs text-slate-600">{{ blog.shortDateTime }}</div>
        </div>
      </a>

    </div>
  </div>
</template>

<script setup>
defineProps({
  blogs: Array
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;
console.log(apiUri)
</script>
