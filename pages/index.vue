<template>
  <div class="grid grid-cols-10">
    <!-- PROFILE CARD -->
    <div
      class="col-span-10 md:col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen p-6"
    >
      <IndexProfilecard :profile="profile" />
    </div>
    <!-- SECTIONS -->
    <div
      class="col-span-10 md:col-span-5 lg:col-span-6 xl:col-span-7 p-6 lg:px-20 md:px-40"
    >
      <IndexAbout :profile="profile" />
      <IndexBlog :blogs="blogs" />
      <IndexExperience :experiences="experiences" />
      <IndexEducation :educations="educations" />
      <IndexProject :projects="projects" />
      <IndexSkill :skills="skills" />
    </div>
  </div>
</template>

<script setup>
// manggul data dari Back End test

  // // KLO DI EXTRACT
  const { data } = await $fetch('http://localhost:5000/portfolio');
  
  console.log(data)

  const profile = data.profile;
  const projects = data.projects;
  const educations = data.educations;
  const skills = data.skills;
  const experiences = data.experiences;
  const blogs = data.blogs;

  // KLO GA DI EXTRACT
  // const { response } = await $fetch('http://localhost:5000/portfolio');


</script>
