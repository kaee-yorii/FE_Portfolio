<template>
  <div class="min-h-screen py-12" id="skill">
    <div
      class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2"
    >
      <LucideUserRound :size="16" />
      <div class="uppercase text-sm font-light">Skill</div>
    </div>
    <div class="mt-10">
      <div class="text-4xl font-semibold mb-6">
        Every great <span class="text-secondary">Projects</span> begins with
        willingness to <span class="text-secondary">Learn</span>
      </div>

      <!-- list of skills with category -->
      <div v-for="n in 4" :key="n" class="mb-6">
        <!-- category -->
        <div class="font-semibold uppercase text-secondary">SKILL CATEGORY</div>
        <div class="flex flex-wrap gap-6">
          <!-- list of skills -->
          <div v-for="n in 10" :key="n" class="group">
            <div
              class="aspect-square bg-neutral w-16 rounded-md flex items-center justify-center group-hover:scale-110 duration-100"
            >
              <LucideWrench :size="28" />
            </div>
            <div
              class="text-center text-nowrap text-sm group-hover:text-secondary"
            >
              Skill {{ n }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>
