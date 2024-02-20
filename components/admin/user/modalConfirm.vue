<template>
    <input type="checkbox" id="confirm" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <form method="dialog">
                <label for="confirm" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">×</label>
            </form>
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Are You Sure?</p>
            <div class="modal-action">
                <label for="confirm" class="btn">No !</label>
                <label for="confirm" @click="handleUpdate" class="btn btn-neutral">Update</label>
            </div>

        </div>
        <!-- click outside -->
        <form method="dialog" class="modal-backdrop">
            <label for="confirm">close</label>
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