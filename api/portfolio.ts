export default defineEventHandler(async (event) => {
    // handle ssr
    return await $fetch('http://localhost:5000/portfolio');
})