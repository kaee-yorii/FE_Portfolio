<template>

<div>
    <div class="font-semibold text-lg mb-4 border-b-neutral/25 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <LucideBriefcase :size="26" />
            Project
        </div>
        <button @click="editData = null; showForm = true" class="btn btn-sm btn-neutral">
            <LucidePlus :size="16" />
            Add Project
        </button>
    </div>
    
    <div class="card w-52 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">
                Shoes!
                <div class="badge badge-secondary">NEW</div>
            </h2>
        </div>
        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">
                Shoes!
                <div class="badge badge-secondary">NEW</div>
            </h2>
        </div>
    </div>
</div>

</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

import { useCounterStore } from '../../stores/counterStore';
const CounterStore = useCounterStore();

const to10 = () => {
    CounterStore.to10();
}
</script>