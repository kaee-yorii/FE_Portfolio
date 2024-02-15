import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({

    }),
    actions: {
        async login(formData) {
            // get apiUri
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            // convert to json
            const jsonData = JSON.stringify(formData);

            await $fetch(apiUri + '/login', {
                method: 'POST',
                body: jsonData,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            // redirect ke home admin
            navigateTo('/admin')

        },
        logout() {
            // handle logout
            console.log('handle logout')
        }
    }
})