
<template>
    <!-- MODAL SUCCESS -->
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">

            <form method="dialog">

                <h3 class="font-bold text-lg"> {{ data ? `UPDATE : ${data.institutionName}` : 'CREATE EDUCATION' }}</h3>

                <label class="form-control w-full max-w-xs">
                    <div class="label label-text">Insitution Name</div>
                    <input v-model="formData.institutionName" type="text" placeholder="Type Here"
                        class="input input-bordered w-full max-w-xs" />
                    <div class="text-error text-right text-sm" v-if="errors.institutionName">{{ errors.institutionName }}
                    </div>
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label label-text">Start Year</div>
                    <input v-model="formData.startYear" type="text" placeholder="Type Here"
                        class="input input-bordered w-full max-w-xs" />
                    <div class="text-error text-right text-sm" v-if="errors.startYear">{{ errors.startYear }}</div>
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label label-text">End Year</div>
                    <input v-model="formData.endYear" type="text" placeholder="Type Here"
                        class="input input-bordered w-full max-w-xs" />
                    <div class="text-error text-right text-sm" v-if="errors.endYear">{{ errors.endYear }}</div>
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label label-text">Major</div>
                    <input v-model="formData.major" type="text" placeholder="Type Here"
                        class="input input-bordered w-full max-w-xs" />
                    <div class="text-error text-right text-sm" v-if="errors.major">{{ errors.major }}</div>
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label label-text">Degree</div>
                    <input v-model="formData.degree" type="text" placeholder="Type Here"
                        class="input input-bordered w-full max-w-xs" />
                    <div class="text-error text-right text-sm" v-if="errors.degree">{{ errors.degree }}</div>
                </label>

                <div class="modal-action">
                    <div class="text-xs text-error" v-if="fetchError">{{ fetchError }}</div>
                    <label @click="$emit('close')" class="btn btn-outline btn-error">Cancel</label>
                    <label @click="save" class="btn btn-primary">
                        {{ data ? 'Update' : 'Save' }}
                        <span v-show="isLoading" class="loading loading-spinner loading-md"></span>
                    </label>
                    <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">×</label>
                </div>

            </form>

        </div>
        <!-- click outside -->
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">close</label>
        </form>
    </div>
</template>

<script setup>
import Joi from "joi";

const props = defineProps({
    data: Object,
    show: Boolean,
    text_confirm: String
});
console.log('props.data')
console.log(props.data)

const emits = defineEmits(['close', 'saved']);
const isLoading = ref(false)
const show_modal = ref(false);

const formData = ref({})

const editData = ref(null);
watchEffect(() => {
    show_modal.value = props.show;

    // reset form
    formData.value = {
        institutionName: props.data ? props.data.institutionName : '',
        startYear: props.data ? props.data.startYear : '',
        endYear: props.data ? props.data.endYear : '',
        major: props.data ? props.data.major : '',
        degree: props.data ? props.data.degree : ''
    }

    console.log('props.data')
    console.log(props.data)
});

const fetchError = ref('');
const errors = ref({});

const EduStore = useEducationStore();

const save = async () => {
    try {
        isLoading.value = true;

        if (!formData.value.endYear) formData.value.endYear = null

        if (!props.data) {
            // jika g ada data -> create
            await EduStore.create(formData.value)
        } else {
            // jika ada data -> update
            await EduStore.update(props.data.id, formData.value)
        }

        isLoading.value = false;

        // emit saved
        emits('saved')
    } catch (error) {
        isLoading.value = false;

        if (error instanceof Joi.ValidationError) {
            console.log(error)
            errors.value = joiError(error);
        } else {
            if (error.data) {
                fetchError.value = error.data.message
            } else {
                console.log(error)
            }
        }
    }
}

</script>