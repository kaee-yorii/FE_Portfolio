
<template>
    <!-- MODAL SUCCESS -->
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">

        <div class="modal-box">
            <!-- x Corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>

            <h3 class="font-bold text-lg"> {{ data ? `UPDATE : ${data.institutionName}` : 'CREATE EDUCATION' }}</h3>

            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Company</div>
                <input v-model="formData.company" type="text" placeholder="Company"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.company">{{ errors.company
                }}
                </div>
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Title</div>
                <input v-model="formData.title" type="text" placeholder="Title"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.title">{{ errors.title
                }}
                </div>
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Location</div>
                <input v-model="formData.location" type="text" placeholder="Location"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.location">{{ errors.location
                }}
                </div>
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Description</div>
                <textarea v-model="formData.description" class="textarea textarea-bordered" placeholder="Description"
                    rows="6"></textarea>
                <!-- <textarea v-model="formData.description" type="text" placeholder="Description" rows="5"
                    class="input input-bordered w-full max-w-xs" ></textarea> -->
                <div class="text-error text-right text-sm" v-if="errors.description">{{ errors.description
                }}
                </div>
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Start Date</div>

                <DatePicker v-model="formData.startDate" color="indigo">
                    <template #default="{ togglePopover }">
                        <button @click="togglePopover" class="btn btn-outline border-neutral/25">
                            {{ dayjs(formData.startDate).format('D MMMM YYYY') }}
                        </button>
                    </template>
                </DatePicker>

                <div class="text-error text-right text-sm" v-if="errors.startDate">{{ errors.startDate
                }}
                </div>
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label label-text">End Date</div>

                <div class="flex items-center gap-3">
                    <DatePicker v-model="formData.endDate" color="indigo">
                        <template #default="{ togglePopover }">
                            <button @click="togglePopover" class="btn btn-outline border-neutral/25 font-normal w-40"
                                :disabled="isPresent">
                                {{ isPresent ? '' : dayjs(formData.endDate).format('D MMMM YYYY') }}
                            </button>
                        </template>
                    </DatePicker>
                    <input type="checkbox" v-model="isPresent" @change="handlePresent" /> PRESENT
                </div>

                <div class="text-error text-right text-sm" v-if="errors.endDate">{{ errors.endDate
                }}
                </div>
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
        </div>

    </div>
    <!-- click outside -->
    <form method="dialog" class="modal-backdrop">
        <label @click="$emit('close')">close</label>
    </form>
</template>

<script setup>
import Joi from "joi";
import dayjs from 'dayjs';
import { DatePicker } from 'v-calendar';

const props = defineProps({
    data: Object,
    show: Boolean,
});
console.log('props.data')
console.log(props.data)

const formData = ref({})

const emits = defineEmits(['close', 'saved']);
const isLoading = ref(false)
const show_modal = ref(false);

const isPresent = ref(false);

watchEffect(() => {
    show_modal.value = props.show;

    // reset form
    formData.value = {
        company: props.data ? props.data.company : '',
        title: props.data ? props.data.title : '',
        location: props.data ? props.data.location : '',
        description: props.data ? props.data.description : '',
        startDate: props.data ? new Date(props.data.startDate) : new Date(),
        endDate: props.data
            ? props.data.endDate != null ? new Date(props.data.endDate) : new Date()
            : new Date()
        // kondisi 1: props.data = null
        // kondisi 2: props.data.endDate = null
    };

    // set is present
    if (props.data) {
        // tergantung kondisi endDate
        isPresent.value = props.data.endDate == null;
    } else {
        // default
        isPresent.value = false;
    }
});

const fetchError = ref('');
const errors = ref({});

const ExpStore = useExperienceStore();

const save = async () => {
    errors.value = {};
    // fetch.error.value = '';

    try {
        isLoading.value = true;

        // jika isPresent ter-centang
        if (isPresent.value) {
            // ubah endDate menjadi null
            formData.value.endDate = null;
        }

        if (!props.data) {
            // handle create
            await ExpStore.create(formData.value)
        } else {
            //update
            const id = props.data.id;
            await ExpStore.create(id, formData.value)
        }

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

const handlePresent = (e) => {
    isPresent = e.target.checked;

    // if (isPresent) {
    //     formData.value.endYear = '';
    // }

}

// EDIT
const showForm = ref(false);
const editData = ref(null);

const saved = () => {
    console.log('saved')
}
</script>