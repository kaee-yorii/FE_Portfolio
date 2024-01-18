<template>
  <div class="min-h-screen py-12" id="blog">
    <div
      class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2"
    >
      <LucideUserRound :size="16" />
      <div class="uppercase text-sm font-light">BLOG</div>
    </div>
    <div class="flex flex-col gap-6 mt-10">
      <div class="text-4xl font-semibold">Latest Blog</div>
      <!-- LIST BLOG -->
      <div class="grid grid-cols-10 gap-3" v-for="n in 4" :key="n">
        <!-- IMAGE -->
        <div
          class="aspect-video bg-neutral col-span-4 xl:col-span-3 rounded-lg"
        ></div>
        <div class="col-span-6 xl:col-span-7">
          <div class="text-2xl font-semibold">Judul Blog</div>
          <div class="font-light line-clamp-2 xl:line-clamp-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
            reprehenderit minima pariatur error voluptatem vero quae atque
            voluptatum quas eligendi?
          </div>
          <div>TEXT</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>
