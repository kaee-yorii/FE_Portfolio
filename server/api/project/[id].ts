export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    // ambil data dari backend
    const config = useRuntimeConfig();
    const apiUri = config.apiUri;

    try {
        // ambil data dari backend project by 
        return await $fetch(apiUri + '/project/' + id);
    } catch (error) {
        // lempar error
        throw error;
    }
});