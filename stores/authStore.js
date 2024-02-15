import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    actions: {
        async login(formData) {
            // get apiUri
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            // convert to json
            const jsonData = JSON.stringify(formData);

            const user = await $fetch(apiUri + '/login', {
                method: 'POST',
                body: jsonData,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            // isis state user
            this.user = user;

            // redirect ke home admin
            navigateTo('/admin')

        },
        async logout() {
            // get apiUri
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            await $fetch(apiUri + '/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            //redirect ke home halaman login
            navigateTo('/admin/login')
        },
        async getUser() {
            const Api = useApiStore();

            const user = await Api.get('/user');
            console.log(user);

            this.user = user;
            // const config = useRuntimeConfig();
            // const apiUri = config.public.apiUri;

            // try {
            //     const user = await $fetch(apiUri + '/user', {
            //         method: 'GET',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         credentials: 'include'
            //     });

            //     this.user = user;
            // } catch (error) {
            //     console.log('error');
            //     console.log(error);
            // }
        }
    }
})