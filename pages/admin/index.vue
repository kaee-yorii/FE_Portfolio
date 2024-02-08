<template>
    <div data-theme="light" class="w-screen h-screen max-w-screen min-h-screen  bg-indigo-400">

        <!-- MOBILE HEADER -->
        <div class="lg:hidden h-[70px] relative border-b border-white/20 px-3 sm:px-8">
            <div class="h-full flex justify-between items-center">
                <a href="" class="flex-none flex gap-4 items-center">
                    <LucideSparkles class="h-8" />
                    <div>Kaeeng</div>
                </a>

                <LucideAlignRight :size="24" />
            </div>
        </div>


        <!-- MAIN HEADER -->
        <div class="h-[70px] relative border-b border-white/[0.08] px-3 sm:px-8 md:py-0 mb-12">
            <div class="h-full flex items-center divide-x divide-white/20">

                <!-- sisi kiri -->
                <a href="" class="max-lg:hidden flex-none flex gap-4 items-center pr-4 text-black">
                    <LucideRocket class="mx-1 h-8" />
                    <div>Kaede Yori</div>
                </a>

                <!-- sisi kanan -->
                <div class="grow">
                    <!-- breadcrumb -->
                    <div class="pl-4 text-slate-800">
                        <div class="text-sm breadcrumbs">
                            <ul>
                                <li><a>Home</a></li>
                                <li><a>Documents</a></li>
                                <li>Add Document</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <!-- avatar -->
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn w-10 h-10 min-h-10 btn-circle">
                        <div class="flex justify-center items-center">
                            <LucideUser :size="26" class="text-primary" />
                        </div>
                    </div>
                    <div class="dropdown-content z-[1] menu bg-base-100 shadow rounded w-52">
                        <div class="p-2 border-b">
                            <div class="font-semibold">Kaee Yorii</div>
                            <div class="text-xs">Administrator</div>
                        </div>
                        <ul tabindex="0" class="p-2">
                            <li>
                                <a>
                                    <LucideUser :size="16" /> User
                                </a>
                            </li>
                            <li>
                                <a>
                                    <LucideLogOut :size="16" /> LogOut
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: false
})
</script>