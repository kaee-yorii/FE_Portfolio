export default defineEventHandler(async (event) => {
    // ambil alamat server
    const config = useRuntimeConfig();
    const apiUri = config.apiUri;

    // ambil query. page
    const { page } = getQuery(event);
    console.log(page)

    // ambil data projects dari backend express
    try {
        return await $fetch(`${apiUri}/projects?limit=9&page=${page}`)
    } catch (error) {
        throw error
    }
});