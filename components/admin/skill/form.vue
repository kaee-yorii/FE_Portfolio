
<template>
    <!-- MODAL SUCCESS -->
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">

        <div class="modal-box">

            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>

            <h3 class="font-bold text-lg"> {{ data ? `UPDATE : ${data.institutionName}` : 'CREATE EDUCATION' }}</h3>
            <div>
                Avatar
                <div class="w-60 aspect-square bg-neutral/30 md:mx-auto rounded-xl">
                    <div v-if="!avatar" class="w-full h-full"></div>
                    <img v-else :src="avatar" class="object-cover min-h-full min-w-full">
                </div>
                <div class="flex md:justify-center mt-2">
                    <input @change="handleFile" accept="image/*" type="file"
                        class="file-input file-input-bordered w-full max-w-xs" />
                </div>
            </div>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Title</div>
                <input v-model="formData.title" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.title">{{ errors.title }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Category</div>
                <input v-model="formData.category" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.category">{{ errors.category }}</div>
            </label>
            <!-- <label class="form-control w-full max-w-xs">
                    <div class="label label-text">Projects</div>
                    <input v-model="formData.projects" type="text" placeholder="Type Here"
                        class="input input-bordered w-full max-w-xs" />
                    <div class="text-error text-right text-sm" v-if="errors.projects">{{ errors.projects }}</div>
                </label> -->

            <div class="modal-action">
                <div class="text-xs text-error" v-if="fetchError">{{ fetchError }}</div>
                <label @click="$emit('close')" class="btn btn-outline btn-error">Cancel</label>
                <label @click="save" class="btn btn-primary">{{ text_confirm || 'Create' }}
                    <span v-show="isLoading" class="loading loading-spinner loading-md"></span>
                </label>
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">×</label>
            </div>


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
});

const isLoading = ref(false)
const emits = defineEmits(['close', 'saved']);
const show_modal = ref(false);

const formData = ref({})

watchEffect(() => {
    show_modal.value = props.show;

    // reset form
    formData.value = {
        svg:  props.data ? props.data.svg :  '',
        title:  props.data ? props.data.title :  '',
        category:  props.data ? props.data.category :  '',
    }
});

const fetchError = ref('');
const errors = ref({});

const SkillStore = useSkillStore();

const save = async () => {
    try {
        isLoading.value = true;

        await SkillStore.create(formData.value)

        isLoading.value = false;

        // emit saved
        emits('saved')
    } catch (error) {
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

let file_avatar = null;
const confirm = ref(false)
const success = ref(false)

const handleUpdate = async () => {
    // TODO confirmation, alert success

    // loading indicator
    if (isLoading.value == false) {
        isLoading.value == true;

        // reset error
        errors.value = {};
        fetchError.value = '';

        confirm.value = false;

        try {
            await SkillStore.update(formData.value, file_avatar);
            isLoading.value = false;
            success.value = true;

        } catch (error) {
            console.log(error)
            isLoading.value = false;

            if (error instanceof Joi.ValidationError) {
                errors.value = joiError(error);
            } else {
                console.log(error)
            }
        }
    }
}

const handleFile = (e) => {
    console.log(e);
    if (e.target.files.length) {
        const file = e.target.files[0];
        file_avatar = file;

        // convert file to dataurl
        // data yg bisa dibaca di tag <img src= />
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            avatar.value = reader.result;
        }
    }
}
const avatar = ref(
    SkillStore.skills.avatar
        ? apiUri + SkillStore.skills.avatar
        : null
)

</script>