<template>
    <!-- modal -->
    <input type="checkbox" v-model="show_modal" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <form method="dialog">
                <label @click="$emit('close')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">×</label>
            </form>
            <h3 class="font-bold text-lg">Cofirm To Processed</h3>
            <p class="py-4">Are You Sure?</p>
            <div class="modal-action">
                <label @click="$emit('close')" class="btn text-white btn-error">No !</label>
                <label class="btn  text-white btn-success">Update</label>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">close</label>
        </form>
    </div>
</template>

<script setup>
const props = defineProps({
    show: Boolean
});

defineEmits(['close']);

const show_modal = ref(false);

watchEffect(() => {
    show_modal.value = props.show;
});
</script>