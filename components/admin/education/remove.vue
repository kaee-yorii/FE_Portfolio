<template>
    <!-- modal -->
    <input type="checkbox" v-model="show_modal" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <form method="dialog">
                <label @click="$emit('close')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">×</label>
            </form>

            <!-- SLOT -->
            <slot />

            <div class="modal-action">
                <label @click="$emit('close')" class="btn text-white btn-neutral">Cancel</label>
                <label class="btn  text-white btn-error" @click="$emit('deleted')">Delete</label>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">close</label>
        </form>
    </div>
</template>

<script setup>
// const AuthStore = useAuthStore();

// const errors = ref({});

const props = defineProps({
    show: Boolean,
    data: Object
});

defineEmits(['close', 'deleted']);

const show_modal = ref(false);

const handleRemove = async () => {
    console.log('masuk delete')
}

watchEffect(() => {
    show_modal.value = props.show;
});

// const handleUpdate = async () => {
//     errors.value = {}
//     fetchError.value = '';
//     success.value = false;

//     try {
//         console.log('masuk handle update')
//         await AuthStore.updateUser(formData.value);
//         success.value = true;

//     } catch (error) {
//         console.log('ada error')
//         console.log(error)
//         if (error instanceof Joi.ValidationError) {
//             // joi error
//             errors.value = joiError(error);
//         }
//         else {
//             // fetch error
//             fetchError.value = error.data.message;
//         }
//     }
// }
</script>