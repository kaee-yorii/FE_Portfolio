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

        <div class="flex gap-3">

            <input v-model="filter" type="text" placeholder="Search"
                class="input input-sm input-bordered w-full max-w-xs" />

            <!-- CATEGORY SELECTOR -->
            <select v-model="selectedCategory" @change="filter = ''"
                class="select select-sm select-bordered w-full max-w-xs">
                <option value="all">All Categories</option>
                <option v-for="cat in SkillStore.categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
                <!-- draw categories -->
            </select>

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

        <AdminSkillForm :show="showForm" :data="updateData" @close="showForm = false" @saved="saved" />

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

const filter = ref('');
const SkillStore = useSkillStore();


const getData = async () => {
    await Promise.all([
        SkillStore.get(),
        SkillStore.getCategories()
    ]);
}

onBeforeMount(async () => {
    await getData();
});

// FORM
const showForm = ref(false);
const updateData = ref(null);

// SELECTOR
const selectedCategory = ref('all');

const dataTable = computed(() => {

    const search = filter.value.toLowerCase();

    const selectedCatID = selectedCategory.value;

    if (search != '') {
        // jalankan filter
        return SkillStore.skills.filter(skill => {
            // pastikan huruf lower
            const title = skill.title.toLowerCase();

            if (selectedCatID == 'all') {
                return title.includes(search)
            } else {
                return title.includes(search) && skill.skillCategoryId == selectedCatID;
            }
        });
    } else {
        // return semua data
        if (selectedCatID == 'all') {
            return SkillStore.skills;
        } else {
            return SkillStore.skills.filter(skill => {
                return skill.skillCategoryId == selectedCatID;
            })
        }
    }
});

// handle after create / update data
const saved = async () => {
    // tutup form modal
    showForm.value = false;
    // fetch ulang data + category
    await getData();
}
</script>