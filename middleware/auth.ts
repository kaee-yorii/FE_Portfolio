export default defineNuxtRouteMiddleware(async (to, from) => {
    // CHECK TOKEN -> melalui cookie
    const AuthStore = useAuthStore();

    const token = useCookie('token');

    if (to.path != '/admin/login') {
        // bukan halaman login

        // check token
        if (!token.value) {
            return navigateTo('/admin/login');
        }

        // kondisi token ada
        if (!AuthStore.user) {
            // fetch data user
            await AuthStore.getUser();

            // kalo error, atau data tetap null, balik ke halaman login

            if (!AuthStore.user) {
                return navigateTo('/admin/login');
            }
        }
    } else {
        // ke halaman login

        // check token, kalo ada, return ke halaman index
        if (token.value) {
            return navigateTo('/admin');
        }
    }

    // CHECK USER DATA
});
