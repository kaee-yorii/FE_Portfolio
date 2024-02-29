<template>
    <div>
        <div class="font-semibold text-lg mb-4 border-b-neutral/25 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideAward :size="26" />
                Experience
            </div>
            <button @click="editData = null; showForm = true" class="btn btn-sm btn-neutral">
                <LucidePlus :size="16" />
                Add Experience
            </button>
        </div>

        <input v-model="filter" type="text" placeholder="Type here" class="input input-sm input-bordered w-full max-w-xs" />

        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Company</th>
                        <th class="text-center">Title</th>
                        <th class="text-center">Periode</th>
                        <th class="text-center">Action</th>

                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="exp in dataTable" :key="exp.id">
                        <th>{{ exp.company }}</th>
                        <td class="text-center">{{ exp.title }}</td>
                        <td class="text-center">{{ exp.readStartDate }} - {{ exp.readEndDate }}</td>
                        <td>
                            <div class="flex justify-center gap-2">
                                <button @click="editData = exp; showForm = true" class="btn btn-circle btn-neutral">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button @click="show_remove_modal = true; removeData = exp"
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
        <AdminUserModalConfirm :show="show_remove_modal" text_confirm="Remove" @close="show_remove_modal = false"
            @saved="handleRemove">
            are you sure to remove
            <span v-if="removeData" class="font-bold">{{
                removeData.institutionName }} ?</span>
        </AdminUserModalConfirm>

        <!-- modal success alert -->
        <AdminModalSuccess :show="show_success_modal" @close="show_success_modal = false" />

        <AdminExperienceForm :data="editData" :show="showForm" @close="showForm = false" @saved="saved" />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

const show_success_modal = ref(false)

const ExpStore = useExperienceStore();

const show_remove_modal = ref(false);

const removeData = ref(null);

onBeforeMount(async () => {
    await ExpStore.get();
    console.log(ExpStore.experiences)
});

const filter = ref('');
const dataTable = computed(() => {

    console.log(filter.value);
    const search = filter.value.toLowerCase();

    if (search != '') {
        // jalankan filter
        return ExpStore.experiences.filter(exp => {
            const company = exp.company.toLowerCase();
            return company.includes(search);
        });
    } else {
        // return semua data
        return ExpStore.experience;
    }
});

const handleRemove = async () => {
    try {
        const id = removeData.value.id;

        // prosess delete
        await ExpStore.remove(id);

        // hide modal
        show_remove_modal.value = false;

        // TODO success modal
        show_success_modal.value = true

        // refresh data
        await ExpStore.get();
    } catch (error) {
        console.log(error);
    }
}

const showForm = ref(false);
const editData = ref(null)
const saved = () => {

}
</script>