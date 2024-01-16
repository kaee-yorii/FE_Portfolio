<template>
    <div class="min-h-screen flex">
        <div class="bg-blue-500 min-h-screen grow grid grid-cols-10">
            <div class="col-span-10 md:col-span-3 min-h-screen bg-slate-600">
                <div class="mx-md:fixed">content 1 fixed</div>
            </div>
            <div class="col-span-10 md:col-span-7 bg-slate-500">
                <div class="min-h-screen bg-rose-200">section 1</div>
                <div class="min-h-screen bg-rose-300">section 2</div>
                <div class="min-h-screen bg-rose-400">section 3</div>
                <div class="min-h-screen bg-rose-500">section 4</div>
            </div>
        </div>
        <div class="bg-blue-400 min-h-screen w-28 flex-none mx-md:hidden">
            <div class="fixed">
                <div>
                    <LucideHome :size="30" />
                    <LucideGithub :size="32" />
                    <LucideUserRound />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>