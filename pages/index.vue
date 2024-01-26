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

  // const data_usefetch = await useFetch('http://localhost:5000/kaee-portfolio');

  // // KLO DI EXTRACT
  const { data } = await $fetch('http://localhost:5000/portfolio');
  
  const profile = data.profile;
  const projects = data.projects;
  const educations = data.educations;
  const skills = data.skills;
  const experiences = data.experiences;
  const blogs = data.blogs;

  // KLO GA DI EXTRACT
  // const { response } = await $fetch('http://localhost:5000/portfolio');

  // const profile = response.data.profile;
  // const projects = response.data.projects;
  // const educations = response.data.educations;
  // const skills = response.data.skills;
  // const experiences = response.data.experiences;
  // const blogs = response.data.blogs;

  console.log("profile")
  console.log(profile)
  console.log("projects")
  console.log(projects)
  console.log("educations")
  console.log(educations)
  console.log("skills")
  console.log(skills)
  console.log("experiences")
  console.log(experiences)
  console.log("blogs")
  console.log(blogs)

</script>
