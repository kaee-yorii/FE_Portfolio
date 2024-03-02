<template>
    <div>
        <div class="font-semibold text-lg mb-4 border-b-neutral/25 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideWrench :size="26" />
                Skill
            </div>
            <button @click="showForm = true" class="btn btn-sm btn-neutral">
                <LucidePlus :size="16" />
                Add Skill
            </button>
        </div>

        <div class="flex 0 gap-4">
            <select class="select select-sm select-bordered w-full max-w-xs">
                <option value="all">All Categories</option>
                <option v-for="cat in SkillStore.categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
                <!-- draw categories -->
            </select>

            <div class="w-full ">
                <input v-model="filter" type="text" placeholder="Type here"
                    class="grow input input-sm input-bordered w-full" />
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th class="text-center">SVG</th>
                        <th class="text-center">Title</th>
                        <th class="text-center">Category</th>
                        <th class="text-center">Projects</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="skill in SkillStore.skills" :key="skill.id">
                        <th>
                            <div v-html="skill.svg" class="w-8 overflow-hidden"></div>
                        </th>
                        <td class="text-center">{{ skill.title }}</td>
                        <td class="text-center">{{ skill.category.title }}</td>
                        <td class="text-center">{{ skill._count.projects }}</td>
                        <td>
                            <div class="flex justify-center gap-2">
                                <button @click="editData = skill; showForm = true" class="btn btn-circle btn-neutral">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button v-if="skill._count.projects == 0"
                                    @click="show_remove_modal = true; removeData = skill" class="btn btn-circle btn-error">
                                    <LucideTrash-2 :size="16" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- modal confirmation -->
        <!-- <AdminUserModalConfirm :show="confirm" @close="confirm = false" @saved="handleUpdate">
            <h3 class="font-bold text-lg">Confirm To Processed</h3>
            <p class="py-4">Are You Sure To Change ?</p>
        </AdminUserModalConfirm> -->

        <!-- modal success alert -->
        <!-- <AdminModalSuccess :show="show_success_modal" @close="show_success_modal = false" /> -->

        <AdminSkillForm :show="showForm" :data="updateData" @close="showForm = false" @saved="" />

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

const filter = ref('');
const SkillStore = useSkillStore();

onBeforeMount(async () => {
    await Promise.all([
        SkillStore.get(),
        SkillStore.getCategories()
    ]);
});

// FORM
const showForm = ref(false);
const updateData = ref(null);
</script>