<template>
    <div>
        <div class="font-semibold mb-4 border-b-neutral/25">USER SETTING</div>
        <div role="tablist" class="tabs tabs-lifted">
            <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="User Detail" checked />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <AdminUserDetail />
            </div>

            <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Change Password" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <AdminUserChangePassword />
            </div>
        </div>
    </div>
</template>

<script script setup >
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});
</script>
