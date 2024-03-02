<template>
    <!-- MODAL SUCCESS -->
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">

            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>

            <h3 class="font-bold text-lg"> {{ data ? `UPDATE : ${data.title}` : 'CREATE SKILL' }}</h3>

            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Title</div>
                <input v-model="formData.title" type="text" placeholder="title"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.title">{{ errors.title
                    }}
                </div>
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Category</div>
                <input v-model="formData.category" type="text" placeholder="category"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.category">{{ errors.category
                    }}
                </div>

                <!-- CATEGORY SELECTOR -->
                <label class="mt-2 text-sm">Select Category</label>
                <!-- <select @change="(e) => formData.category = e.target.value"
                        class="select select-sm select-bordered w-full max-w-xs">
                        <option v-for="cat in SkillStore.categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
                    </select> -->

                <div class="flex flex-wrap gap-2 mt-2">
                    <button v-for="cat in SkillStore.categories" :key="cat.id" @click="formData.category = cat.title"
                        class="btn btn-sm w-min text-nowrap">{{ cat.title }}
                    </button>
                </div>
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label label-text">SVG</div>

                <!-- PREVIEW SVG -->
                <div v-html="formData.svg" class="w-32 h-32 bg-neutral/10 rounded-full p-6 mc-2 mx-auto"></div>

                <textarea v-model="formData.svg" class="textarea textarea-bordered" placeholder="SVG"
                    rows="6"></textarea>
                <div class="text-error text-right text-sm" v-if="errors.svg">{{ errors.svg
                    }}
                </div>
            </label>

            <div class="modal-action">
                <div class="text-xs text-error" v-if="fetchError">{{ fetchError }}</div>
                <label @click="$emit('close')" class="btn btn-outline btn-error">Cancel</label>
                <label @click="handleSave" class="btn btn-primary">
                    {{ data ? 'Update' : 'Create' }}
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
const SkillStore = useSkillStore();

const emit = defineEmits(['close', 'saved']);
const isLoading = ref(false)
const show_modal = ref(false);

const formData = ref({})

const editData = ref(null);

watchEffect(() => {
    show_modal.value = props.show;

    // reset form
    formData.value = {
        title: props.data ? props.data.title : '',
        category: props.data ? props.data.category.title : '',
        svg: props.data ? props.data.svg : ''
    }

});

const fetchError = ref('');
const errors = ref({});

const handleSave = async () => {
    // reset error
    errors.value = {};
    fetchError.value = '';
    try {
        // tampilkan loading
        isLoading.value = true;

        await SkillStore.create(formData.value);

        // hilangkan loading
        isLoading.value = false;

        emit('saved');
    } catch (error) {

        // hilangkan loading
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
</script>