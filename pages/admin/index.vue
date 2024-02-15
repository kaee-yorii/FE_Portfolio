<template>
    <div>
        Ini halaman index
    </div>
    <div>
        Counter: {{ CounterStore.count }}
    </div>
    <div class="flex gap-4">
        <button class="btn btn-primary " @click="CounterStore.increment">Add Count</button>
        <button class="btn btn-primary " @click="CounterStore.decrement">Dec Count</button>
    </div>
    <div>
        Name: {{ AuthStore.user.name }}
    </div>
    <div>
        Email: {{ AuthStore.user.email }}
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
});

import { useCounterStore } from '../../stores/counterStore';
const CounterStore = useCounterStore();
const AuthStore = useAuthStore();
</script>