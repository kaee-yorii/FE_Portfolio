<template>
  <div data-theme="autumn" class="min-h-screen flex text-default">
    <!-- MAIN CONTENT -->
    <div class="min-h-screen grow grid grid-cols-10">
      <div class="col-span-10 md:col-span-3 min-h-screen">
        <div class="mx-md:fixed">content 1 fixed</div>
      </div>
      <!-- SECTIONS -->
      <div class="col-span-10 md:col-span-7">
        <div class="min-h-screen">section 1</div>
        <div class="min-h-screen">section 2</div>
        <div class="min-h-screen">section 3</div>
        <div class="min-h-screen">section 4</div>
      </div>
    </div>

    <!-- SIDE MENU -->
    <div class="min-h-screen w-28 flex-none max-md:hidden relative">
      <div class="mx-md:hidden fixed min-h-screen flex items-center">
        <!-- update padding-->
        <div class="border border-neutral p-5 rounded-full flex flex-col gap-4">
          <div class="tooltip tooltip-top" data-tip="Home">
            <LucideHome :size="22" class="text-secondary" />
          </div>
          <div class="tooltip tooltip-right" data-tip="UserRound">
            <LucideUserRound :size="22" class="text-secondary" />
          </div>
          <div class="tooltip tooltip-left" data-tip="LayoutPanelLeft">
            <LucideLayoutPanelLeft :size="22" class="text-secondary" />
          </div>
          <div class="tooltip tooltip-right" data-tip="Project">
            <LucideBriefcase :size="22" class="text-secondary" />
          </div>
          <div class="tooltip tooltip-left" data-tip="Testimonial">
            <LucideUserRound :size="22" class="text-secondary" />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Mail">
            <LucideMail :size="22" class="text-secondary" />
          </div>
        </div>
      </div>
    </div>
    <!-- SIDE MENU DRAWER TOGGLE BUTTON -->
    <div class="md:hidden drawer-content fixed right-8">
      <label for="my-drawer-4" class="btn btn-outline btn-circle mt-8">
        <LucideMenu :size="22" />
      </label>
    </div>
  </div>

  <!-- MOBILE MENU DRAWER -->
  <div class="drawer drawer-end">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side overflow-hidden">
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="p-14 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <div class="px-4 text-2xl">menu</div>
        <ul class="menu">
          <li>
            <a href="#" class="flex gap items-start">
              <LucideHome :size="16" class="text-secondary" />
              <div>Home</div>
            </a>
          </li>
          <li>
            <a href="#" class="flex gap items-start">
              <LucideUserRound :size="16" class="text-secondary" />
              <div>Profile</div>
            </a>
          </li>
          <li>
            <a href="#" class="flex gap items-start">
              <LucideLayoutPanelLeft :size="16" class="text-secondary" />
              <div>Contact</div>
            </a>
          </li>
          <li>
            <a href="#" class="flex gap items-start">
              <LucideBriefcase :size="16" class="text-secondary" />
              <div>Testimonial</div>
            </a>
          </li>
          <li>
            <a href="#" class="flex gap items-start">
              <LucideUserRound :size="16" class="text-secondary" />
              <div>Contact</div>
            </a>
          </li>
        </ul>
        <div class="px-4 py-4 text-2xl">Social</div>
        <div class="menu flex flex-row gap-6 pl-6">
          <a href="#">
            <LucideInstagram :size="16" class="text-secondary" />
          </a>
          <a href="#">
            <LucideTwitter :size="16" class="text-secondary" />
          </a>
          <a href="#">
            <LucideGlobe2 :size="16" class="text-secondary" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
