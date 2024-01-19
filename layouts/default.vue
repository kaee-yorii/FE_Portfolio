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
      <label for="my-drawer-4" class="btn btn-outline btn-circle mt-8">
        <LucideMenu :size="22" />
      </label>
    </div>
  </div>

  <!-- MOBILE MENU DRAWER -->
  <div class="drawer drawer-end">
    <input
      v-model="toggleDrawer"
      id="my-drawer-4"
      type="checkbox"
      class="drawer-toggle"
    />
    <div class="drawer-side overflow-hidden">
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="p-14 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <div class="px-4 text-2xl">Menu</div>
        <ul class="menu">
          <li v-for="(menu, i) in menus" :key="i">
            <NuxtLink
              :to="{ path: menu.path, hash: menu.hash }"
              @click="toggleDrawer = !toggleDrawer"
              class="flex gap items-start"
            >
              <component :is="menu.icon" :size="16" class="text-secondary" />
              <div>{{ menu.title }}</div>
            </NuxtLink>
          </li>
        </ul>

        <div class="px-4 py-4 text-2xl">Social</div>
        <div class="menu flex flex-row gap-6 pl-6">
          <NuxtLink to="https://www.instagram.com/kaeropiii.__/">
            <LucideInstagram :size="16" class="text-secondary" />
          </NuxtLink>
          <NuxtLink to="https://github.com/kaee-yorii/kaee-portfolio-vueJs">
            <LucideGithub :size="16" class="text-secondary" />
          </NuxtLink>
          <NuxtLink to="https://discord.gg/6WmVveH2">
            <LucideTwitter :size="16" class="text-secondary" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
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
  {
    path: "/",
    hash: "#contact",
    title: "Contact",
    icon: resolveComponent("LucideMail"),
  },
];
</script>

<style>
html,
body {
  scroll-behavior: smooth;
}
</style>
