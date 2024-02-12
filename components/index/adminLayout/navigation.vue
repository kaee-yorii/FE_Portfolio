<template>
    <ul class="menu bg-neutral lg:rounded-box p-4 w-[250px] min-h-screen lg:min-h-full text-white">
        <li class="my-2 font-light">MAIN MENU</li>
        <template v-for="(menu, i) in menus" :key="i">
            <IndexAdminLayoutNavigationItem :menu="menu" />
        </template>
    </ul>
</template>

<script setup>

const menus = [
    {
        title: "Dashboard 1",
        to: "/admin",
        icon: resolveComponent("LucideLayoutDashboard"),
    },
    {
        title: "Dashboard 2",
        to: "/admin",
        icon: resolveComponent("LucideLayoutDashboard"),
    },
    {
        title: "Menu 2",
        to: "/admin",
        icon: resolveComponent("LucideLayoutDashboard"),
        children: [
            {
                title: "Children 1",
                to: "/admin",
                icon: resolveComponent("LucideLayoutDashboard"),
                children: [
                    {
                        title: "Sub Children 2",
                        to: "/admin",
                        icon: resolveComponent("LucideLayoutDashboard"),
                    },
                    {
                        title: "Sub Children 2",
                        to: "/admin",
                        icon: resolveComponent("LucideLayoutDashboard"),
                    }
                ]
            },
            {
                title: "Dashboard 2",
                to: "/admin",
                icon: resolveComponent("LucideLayoutDashboard")
            }
        ]
    },
]

</script>