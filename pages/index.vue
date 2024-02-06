<template>
  <div class="grid grid-cols-10">
    <!-- PROFILE CARD -->
    <div class="col-span-10 md:col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen p-6">
      <IndexProfilecard :profile="profile" />
    </div>
    <!-- SECTIONS -->
    <div class="col-span-10 md:col-span-5 lg:col-span-6 xl:col-span-7 p-6 lg:px-20 md:px-40">
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
definePageMeta({
  middleware: ['profile']
})

// SEO and META
const { value: useProfile } = useState('profile');
const fullname = `${useProfile.lastName} ${useProfile.firstName}`

useSeoMeta({
  title: useProfile.lastName + ' Homepage !',
  description: useProfile.bio
})
// END: // SEO and META

const getProfile = async () => {
  try {
    return await $fetch('/api/portfolio');
  } catch {
    throw createError(Error);
  }
}

const { profile, blogs, experiences, educations, skills, projects } = await getProfile();

</script>
