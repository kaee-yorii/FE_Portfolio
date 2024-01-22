<template>
  <div data-theme="nord" class="min-h-screen flex text-default">
    <!-- MAIN CONTENT -->
    <div class="min-h-screen grow">
      <slot />
    </div>

    <!-- SIDE MENU -->
    <IndexDefaultlayoutSidemenu :menus="menus" />

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
  <IndexDefaultlayoutMenudrawer :toggleDrawer="toggleDrawer" :menus="menus" />

  <!-- FOOTER -->
  <IndexDefaultlayoutFooter :menu="menus" />
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
