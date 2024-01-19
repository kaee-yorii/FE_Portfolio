<template>
  <div class="min-h-screen py-12 flex flex-col" id="about">
    <div
      class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2"
    >
      <LucideUserRound :size="16" />
      <div>About</div>
    </div>
    <div class="flex flex-col gap-6 mt-10 grow">
      <div class="text-6xl">
        Say Hi from <span class="text-secondary">Drake</span>, Webflow Desiger
        and Developer
      </div>
      <div class="text-4xl font-semibold">
        Every great design with an even better story
      </div>
      <div class="font-light">
        Since beginning my journey as a freelance designer nearly 8 years ago,
        I've done remote work for agencies, consulted for startups, and
        collaborated with talented people to create digital products for both
        business and consumer use. I'm quietly confident, naturally curious, and
        perpetually working on improving my chopsone design problem at a time.
      </div>
      <div class="flex items-end gap-20 grow pb-20">
        <div>
          <div class="text-4xl text-secondary">10+</div>
          <div>YEARS OF<br />EXPERIENCE</div>
        </div>
        <div>
          <div class="text-4xl text-secondary">10+</div>
          <div>PROJECTS<br />COMPLITED</div>
        </div>
      </div>
    </div>
  </div>
</template>
