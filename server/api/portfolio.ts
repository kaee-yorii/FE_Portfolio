export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const apiUri = config.apiUri;
    try {
        // handle ssr
        return await $fetch(apiUri + '/portfolio');
    } catch (error) {
        throw error
    }
})