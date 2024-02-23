<template>
    <div>
        <div class="font-semibold text-lg mb-4 border-b-neutral/25">Education</div>

        <input v-model="filter" type="text" placeholder="Type here" class="input input-sm input-bordered w-full max-w-xs" />

        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th class="text-center">ID</th>
                        <th class="text-center">Institution</th>
                        <th class="text-center">Periode</th>
                        <th class="text-center">Major</th>
                        <th class="text-center">Degree</th>
                        <th class="text-center">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="edu in dataTable" :key="edu.id">
                        <th class="text-center">{{ edu.id }}</th>
                        <th class="text-center">{{ edu.institutionName }}</th>
                        <td class="text-center">{{ edu.startYear }} - {{ edu.endYear }}</td>
                        <td class="text-center">{{ edu.major }}</td>
                        <td class="text-center">{{ edu.degree }}</td>
                        <td>
                            <div class="flex justify-center gap-2">
                                <button class="btn btn-circle btn-neutral">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button @click="show_remove_modal = true; removeData = edu"
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
        <AdminModalSuccess :show="show_success_modal" @close="show_remove_modal = false" />

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
</script>