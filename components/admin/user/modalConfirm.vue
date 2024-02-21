<template>
    <!-- modal -->
    <input type="checkbox" v-model="show_modal" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <form method="dialog">
                <label @click="$emit('close')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">×</label>
            </form>

            <slot />

            <div class="modal-action">
                <label @click="$emit('close')" class="btn text-white btn-error">No !</label>
                <label class="btn  text-white btn-success" @click="$emit('saved')">{{ text_confirm || 'Update' }}</label>
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
    text_confirm: String
});

defineEmits(['close', 'saved']);

const show_modal = ref(false);

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