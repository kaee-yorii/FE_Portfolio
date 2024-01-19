<template>
  <div data-theme="dracula" class="min-h-screen flex text-default">
    <!-- MAIN CONTENT -->
    <div class="min-h-screen grow">
      <slot />
    </div>

    <!-- SIDE MENU -->
    <div class="min-h-screen w-28 flex-none max-md:hidden relative">
      <div class="mx-md:hidden fixed min-h-screen flex items-center">
        <!-- update padding-->
        <div class="border border-neutral p-5 rounded-full flex flex-col gap-4">
          <NuxtLink
            v-for="(menu, i) in menus"
            :key="i"
            :to="{ path: menu.path, hash: menu.hash }"
            class="tooltip tooltip-top"
            :data-tip="menu.title"
          >
            <component :is="menu.icon" :size="16" class="text-secondary" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- SIDE MENU DRAWER TOGGLE BUTTON -->
    <div class="z-10 md:hidden drawer-content fixed right-8">
      <label
        @click="toggleDrawer = !toggleDrawer"
        class="btn btn-outline btn-circle mt-8"
      >
        <LucideMenu :size="22" />
      </label>
    </div>
  </div>

  <!-- MOBILE MENU DRAWER -->
  <IndexMenudrawer :toggleDrawer="toggleDrawer" :menus="menus" />
</template>

<script setup>
// reactive boolean
// toggle for open/close drawer
const toggleDrawer = ref(false);

const menus = [
  {
    path: "/",
    hash: "",
    title: "Home",
    icon: resolveComponent("LucideHome"),
  },
  {
    path: "/",
    hash: "#about",
    title: "About",
    icon: resolveComponent("LucideUserRound"),
  },
  {
    path: "/",
    hash: "#blog",
    title: "Blog",
    icon: resolveComponent("LucideAlbum"),
  },
  {
    path: "/",
    hash: "#experience",
    title: "Experience",
    icon: resolveComponent("LucideLayoutPanelLeft"),
  },
  {
    path: "/",
    hash: "#education",
    title: "Education",
    icon: resolveComponent("LucideGraduationCap"),
  },
  {
    path: "/",
    hash: "#project",
    title: "Project",
    icon: resolveComponent("LucideBriefcase"),
  },
  {
    path: "/",
    hash: "#skill",
    title: "Skill",
    icon: resolveComponent("LucideUserRound"),
  },
];
</script>

<style>
html,
body {
  scroll-behavior: smooth;
}
</style>
