<template>
    <!-- ga punya children -->
    <li v-if="!menu.children">
        <NuxtLink :to="menu.to">
            <component :is="menu.icon" :size="20" />{{ menu.title }}
        </NuxtLink>
    </li>

    <!-- punya children -->
    <li v-if="menu.children">
        <details open>
            <summary>
                <component :is="menu.icon" :size="20" />{{ menu.title }}
            </summary>

            <ul>
                <template v-for="(subMenu, i) in menu.children" :key="i">
                    <IndexAdminLayoutNavigationItem :menu="subMenu" />
                </template>
            </ul>

        </details>
    </li>
</template>

<script setup>
defineProps({
    menu: Object
})
</script>

<style lang="scss" scoped></style>