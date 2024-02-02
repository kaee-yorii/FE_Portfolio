export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    // ambil data dari backend
    const config = useRuntimeConfig();
    const apiUri = config.apiUri;

    try {
        // ambil data dari backend blog by 
        return await $fetch(apiUri + '/blog/' + id);
    } catch (error) {
        // lempar error
        throw error;
    }
});