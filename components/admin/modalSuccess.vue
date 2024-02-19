<template>
    <!-- MODAL SUCCESS -->
    <input v-model="show_modal" type="checkbox" id="success" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <!-- corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">×</label>
            </form>
            <h3 class="font-bold text-lg">SUCCESS!</h3>

            <div class="modal-action">
                <label @click="$emits('close')" class="btn btn-neutral">close</label>
            </div>

        </div>
        <!-- click outside -->
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
})
</script>