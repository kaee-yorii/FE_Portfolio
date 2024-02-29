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
            <select name="" id="" class="w-60">
                <option value="">All Categories</option>
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
                    <tr v-for="skill in dataTable" :key="skill.id">
                        <th>
                            <div v-html="skill.svg" class="w-8 overflow-hidden"></div>
                        </th>
                        <td class="text-center">{{ skill.title }}</td>
                        <td class="text-center">{{ skill.category.title }}</td>
                        <td class="text-center">{{ skill.projects }}</td>
                        <td>
                            <div class="flex justify-center gap-2">
                                <button class="btn btn-circle btn-neutral">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button @click="show_remove_modal = true; removeData = skill"
                                    class="btn btn-circle btn-error">
                                    <LucideTrash-2 :size="16" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- modal confirmation -->
        <AdminUserModalConfirm :show="confirm" @close="confirm = false" @saved="handleUpdate">
            <h3 class="font-bold text-lg">Confirm To Processed</h3>
            <p class="py-4">Are You Sure To Change ?</p>
        </AdminUserModalConfirm>

        <!-- modal success alert -->
        <AdminModalSuccess :show="show_success_modal" @close="show_success_modal = false" />

        <AdminSkillForm :show="showForm" text_confirm="Save" @close="showForm = false" @saved="saved" />

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

const SkillStore = useSkillStore();
const show_remove_modal = ref(false);
const show_success_modal = ref(false);
const removeData = ref(null)
const filter = ref('');

onBeforeMount(async () => {
    await SkillStore.get();
});


const dataTable = computed(() => {

    const search = filter.value.toLowerCase();

    if (search != '') {
        // jalankan filter
        return SkillStore.skills.filter(skill => {
            const title = skill.title.toLowerCase();
            return title.includes(search);
        });
    } else {
        // return semua data
        return SkillStore.skills;
    }
});


const handleRemove = async () => {
    try {
        const id = removeData.value.id;

        // prosess delete
        await SkillStore.remove(id);

        // hide modal
        show_remove_modal.value = false;

        // TODO success modal
        show_success_modal.value = true

        // refresh data
        await SkillStore.get();
    } catch (error) {
        console.log(error);
    }
}

// CREATE
const showForm = ref(false);
// berhasil
const saved = async () => {
    showForm.value = false;

    show_success_modal.value = true;

    // fetch ulang data education
    await SkillStore.get();
}
</script>