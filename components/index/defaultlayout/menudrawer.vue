<template>
  <div class="drawer drawer-end">
    <input
      v-model="show_drawer"
      id="my-drawer-4"
      type="checkbox"
      class="drawer-toggle"
    />
    <div class="drawer-side overflow-hidden">
      <label
        @click="show_drawer = !show_drawer"
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
              <component :is="menu.icon" :size="16" class="text-accent" />
              <div>{{ menu.title }}</div>
            </NuxtLink>
          </li>
        </ul>

        <div class="px-4 py-4 text-2xl">Social</div>
        <div class="menu flex flex-row gap-6 pl-6">
          <NuxtLink to="https://www.instagram.com/kaeropiii.__/">
            <LucideInstagram :size="16" class="text-accent" />
          </NuxtLink>
          <NuxtLink to="https://github.com/kaee-yorii/kaee-portfolio-vueJs">
            <LucideGithub :size="16" class="text-accent" />
          </NuxtLink>
          <NuxtLink to="https://discord.gg/6WmVveH2">
            <LucideTwitter :size="16" class="text-accent" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  toggleDrawer: Boolean,
  menus: Array,
});

let show_drawer = ref(props.toggleDrawer);
// use WATCH EFFECT TO HANDLE TOGGLE -> akan check setiap perubahan variable
watchEffect(() => {
  // check perubahan dari props, toggleDrawer
  show_drawer.value = props.toggleDrawer;
});
</script>
