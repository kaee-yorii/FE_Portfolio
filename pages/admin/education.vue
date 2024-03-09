<template>
    <div>
        <div class="font-semibold text-lg mb-4 border-b-neutral/25 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideGraduationCap :size="26" />
                Education
            </div>
            <button @click="editData = null; showForm = true" class="btn btn-sm btn-neutral">
                <LucidePlus :size="16" />
                Add Education
            </button>
        </div>

        <input v-model="filter" type="text" placeholder="Type here"
            class="input input-sm input-bordered w-full max-w-xs" />

        <div class="overflow-x-auto max-lg:hidden">
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Institution</th>
                        <th class="text-center">Periode</th>
                        <th class="text-center">Major</th>
                        <th class="text-center">Degree</th>
                        <th class="text-center">Remove</th>
                    </tr>
                </thead>
                <tbody v-if="EduStore.educations">
                    <!-- row 1 -->
                    <tr v-for="edu in dataTable" :key="edu.id">
                        <td>{{ edu.institutionName }}</td>
                        <td class="text-center">{{ edu.startYear }} - {{ edu.endYear || 'Present' }}</td>
                        <td class="text-center">{{ edu.major }}</td>
                        <td class="text-center">{{ edu.degree }}</td>
                        <td>
                            <div class="flex gap-2 justify-center">
                                <button @click="editData = edu; showForm = true" class="btn btn-circle btn-neutral">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button class="btn btn-circle btn-error"
                                    @click="show_remove_modal = true; removeData = edu">
                                    <LucideTrash2 :size="16" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <!-- SKELETON TABLE -->
                <AdminEducationSkeletonTable v-else />
            </table>
        </div>
        <!-- SKELETON MOBILE -->
        <div v-if="EduStore.educations" class="lg:hidden flex flex-col gap-2 sm:gap-4 pt-2">
            <div v-for="edu in dataTable" :key="edu.id" class="card bg-base-100 shadow-xl">
                <div class="card-body max-sm:p-4">

                    <div class="flex justify-between">
                        <div>
                            <div class="font-semibold">{{ edu.institutionName }}</div>
                            <div class="text-sm">Periode: {{ edu.startYear }} - {{ edu.endYear || 'Present' }}</div>
                        </div>

                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn m-1">
                                <LucideMoreVertical :size="16" />
                            </div>
                            <ul tabindex="0"
                                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                                <li><button @click="editData = edu; showForm = true" class="btn btn-sm my-1">
                                        <LucidePencilLine :size="16" />
                                        Edit
                                    </button></li>
                                <li><button @click="removeData = edu; show_remove_modal = true"
                                        class="btn btn-sm my-1 btn-error">
                                        <LucideTrash2 :size="16" />
                                        Remove
                                    </button></li>
                            </ul>
                        </div>
                    </div>
                    <div class="grid grid-cols-10 gap-3">
                        <button class="col-span-6 btn flex justify-between">
                            <div>Major:</div>
                            <div class="font-normal">{{ edu.major }}</div>
                        </button>
                        <button class="col-span-4 btn flex justify-between">
                            <div>Degree:</div>
                            <div class="font-normal">{{ edu.degree }}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <AdminEducationSkeletonMobile v-else />

        <!-- modal confirmation -->
        <AdminUserModalConfirm :show="show_remove_modal" text_confirm="Remove" @close="show_remove_modal = false"
            @saved="handleRemove">
            are you sure to remove
            <span v-if="removeData" class="font-bold">{{
                    removeData.institutionName }} ?</span>
        </AdminUserModalConfirm>

        <!-- modal success alert -->
        <AdminModalSuccess :show="show_success_modal" @close="show_success_modal = false" />

        <AdminEducationForm :data="editData" :show="showForm" @close="showForm = false" @saved="saved" />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const show_success_modal = ref(false)

const EduStore = useEducationStore();

const show_remove_modal = ref(false);

const removeData = ref(null);

onBeforeMount(async () => {
    await EduStore.get();
});

const filter = ref('');
const dataTable = computed(() => {

    console.log(filter.value);
    const search = filter.value.toLowerCase();

    if (search != '') {
        // jalankan filter
        return EduStore.educations.filter(edu => {
            const institutionName = edu.institutionName.toLowerCase();
            return institutionName.includes(search);
        });
    } else {
        // return semua data
        return EduStore.educations;
    }
});

const handleRemove = async () => {
    try {
        const id = removeData.value.id;

        // prosess delete
        await EduStore.remove(id);

        // hide modal
        show_remove_modal.value = false;

        show_success_modal.value = true

        // refresh data
        await EduStore.get();
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
    await EduStore.get();
}

const editData = ref(null)
</script>