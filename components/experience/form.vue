
<template>
    <!-- MODAL SUCCESS -->
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">

            <form method="dialog">
                

                <h3 class="font-bold text-lg"> {{ data ? `UPDATE : ${data.institutionName}` : 'CREATE EDUCATION' }}</h3>


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

const isChecked = ref(false);

watchEffect(() => {
    show_modal.value = props.show;

    isChecked.value = props.data ? props.data.endYear == null : false

    console.log('props.data')
    console.log(props.data)
});

const fetchError = ref('');
const errors = ref({});

const EduStore = useEducationStore();

const save = async () => {
    errors.value = {};
    fetch.error.value = '';

    try {
        isLoading.value = true;

        isLoading.value = false;
        // emit saved
        emits('saved')
    } catch (error) {
        isLoading.value = false;

        if (error instanceof Joi.ValidationError) {
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

// EDIT
const showForm = ref(false);
const editData = ref(null);

const saved = () => {
    console.log('saved')
}
</script>