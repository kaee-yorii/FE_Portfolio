<template>
    <div>
        <div class="font-semibold text-lg mb-4 border-b-neutral/25 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideWrench :size="26" />
                Skill
            </div>
            <button @click="editData = null; showForm = true" class="btn btn-sm btn-neutral">
                <LucidePlus :size="16" />
                Add Skill
            </button>
        </div>

        <div class="flex gap-2">

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

        <div class="overflow-x-auto max-lg:hidden">
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
                        <div class="pl-6">
                            <td class="btn btn-transparent btn-circle shadow-md">{{ skill._count.projects }}</td>
                        </div>
                        <td>
                            <div class="flex justify-center gap-2">
                                <button @click="editData = skill; showForm = true" class="btn btn-circle btn-neutral">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button v-if="skill._count.projects == 0"
                                    @click="show_remove_modal = true; removeData = skill"
                                    class="btn btn-circle btn-error">
                                    <LucideTrash-2 :size="16" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="lg:hidden flex flex-col gap-2 sm:gap-4 pt-2">
            <div v-for="skill in dataTable" :key="skill.id" class="card bg-base-100 shadow-xl">
                <div class="card-body max-sm:p-4">
                    <div class="flex justify-between">
                        <div class="flex gap-4 items-center">
                            <div v-html="skill.svg" class="w-10 overflow-hidden"></div>
                            <div>
                                <div class="font-semibold">{{ skill.title }}</div>
                                <div class="text-sm">{{ skill.category.title }}</div>
                            </div>
                        </div>

                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-outline border-none">
                                <LucideMoreVertical :size="16" />
                            </div>
                            <ul tabindex="0"
                                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                                <li><button @click="editData = skill; showForm = true" class="btn btn-sm my-1">
                                        <LucidePencilLine :size="16" />
                                        Edit
                                    </button></li>
                                <li><button @click="removeData = skill; show_remove_modal = true"
                                        class="btn btn-sm my-1 btn-error">
                                        <LucideTrash2 :size="16" />
                                        Remove
                                    </button></li>
                            </ul>
                        </div>
                    </div>

                    <div class="flex grow justify-between items-center px-2">
                        <div>Amount projects :</div>
                        <div
                            class="flex items-center justify-center rounded-full font-normal bg-neutral/30 w-10 h-10 shadow-sm">
                            {{ skill._count.projects }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal confirmation -->
        <AdminUserModalConfirm :show="show_remove_modal" text_confirm="Remove" @close="show_remove_modal = false"
            @saved="handleRemove">
            Are You Sure To Remove
            <span v-if="removeData" class="font-bold">{{ removeData.title }} ? </span>
        </AdminUserModalConfirm>

        <!-- modal success alert -->
        <AdminModalSuccess :show="show_success_modal" @close="show_success_modal = false" />

        <AdminSkillForm :show="showForm" :data="editData" @close="showForm = false" @saved="saved" />

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

const show_success_modal = ref(false);

const removeData = ref(null);

const show_remove_modal = ref(false);

// FORM
const showForm = ref(false);
const updateData = ref(null);
const editData = ref(null)

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

const handleRemove = async () => {
    try {
        const id = removeData.value.id;

        // prosess delete
        await SkillStore.remove(id);

        // hide modal
        show_remove_modal.value = false;

        show_success_modal.value = true

        // refresh data
        await SkillStore.get();
    } catch (error) {
        console.log(error);
    }
}

// handle after create / update data
const saved = async () => {
    // tutup form modal
    showForm.value = false;
    // fetch ulang data + category
    await getData();
}
</script>