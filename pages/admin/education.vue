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

        <input v-model="filter" type="text" placeholder="Type here" class="input input-sm input-bordered w-full max-w-xs" />

        <div class="lg:hidden flex flex-col gap-2 sm:gap-4">
            <div v-for="edu in dataTable" :key="edu.id" class="card bg-base-100 shadow-xl">
                <div class="card-body max-sm:p-4">
                    <div class="font-semibold">{{ edu.institutionName }}</div>
                    <div class="text-sm">Periode: {{ edu.startYear }} - {{ edu.endYear || 'Present' }}</div>
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
    middleware: 'auth'
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

        // TODO success modal
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