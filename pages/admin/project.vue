<template>
    <div>
        Halaman Project
    </div>
    <div>
        Counter: {{ CounterStore.count }}
    </div>
    <buuton class="btn btn-primary" @click="to10">To 10</buuton>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
});

import { useCounterStore } from '../../stores/counterStore';
const CounterStore = useCounterStore();

const to10 = () => {
    CounterStore.to10();
}
</script>