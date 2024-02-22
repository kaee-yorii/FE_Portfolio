<template>
    <div>
        <div class="font-semibold mb-4 border-b-neutral/25">Profile</div>

        <div role="tablist" class="tabs tabs-lifted">
            <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="User" checked />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <AdminProfileUser v-if="ProfileStore.profile != null" />
            </div>

            <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Social Media" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <AdminProfileSocialMedia v-if="ProfileStore.profile != null" />
            </div>

        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const ProfileStore = useProfileStore();

onBeforeMount(async () => {
    if (ProfileStore.profile == null) {
        // get profile if state profile is null
        await ProfileStore.get();
    }
});

</script>