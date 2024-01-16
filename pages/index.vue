<template>
  <div data-theme="forest" class="min-h-screen flex text-default">
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
    <div class="min-h-screen w-28 flex-none mx-md:hidden">
      <div class="fixed min-h-screen flex items-center">
        <div class="border border-neutral p-4 rounded-full flex flex-col gap-4">
          <div class="tooltip tooltip-top" data-tip="Home">
            <LucideHome :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-right" data-tip="UserRound">
            <LucideUserRound :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-left" data-tip="LayoutPanelLeft">
            <LucideLayoutPanelLeft :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-right" data-tip="Project">
            <LucideBriefcase :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-left" data-tip="Testimonial">
            <LucideUserRound :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Mail">
            <LucideMail :size="22" class="text-accent" />
          </div>
        </div>
      </div>
      <div class="drawer-content fixed">
        <label for="my-drawer-4" class="btn btn-outline btn-circle mt-8">
          <LucideMenu :size="22" />
        </label>
      </div>
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
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
