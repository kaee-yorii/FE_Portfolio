<template>
  <div class="grid grid-cols-10">
    <!-- PROFILE CARD -->
    <div
      class="col-span-10 md:col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen p-6"
    >
      <IndexProfilecard />
    </div>
    <!-- SECTIONS -->
    <div
      class="col-span-10 md:col-span-5 lg:col-span-6 xl:col-span-7 p-6 lg:px-20 md:px-40"
    >
      <IndexAbout />
      <IndexBlog />
      <IndexExperience />
      <IndexEducation />
      <IndexProject />
      <IndexSkill />
    </div>
  </div>
</template>

<script setup>
// manggul data dari Back End test

 const data = await useFetch('http://localhost:5000/kaee-portfolio');
  console.log(data)
</script>
