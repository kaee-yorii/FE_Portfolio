export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const apiUri = config.apiUri;

    try {
        return await $fetch(apiUri + '/profile');
    } catch (error) {
        throw error;
    }
})