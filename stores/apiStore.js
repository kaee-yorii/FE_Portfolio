import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', {
    state: () => ({}),
    actions: {
        // get
        async get() {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;
            try {
                const user = await $fetch(apiUri + '/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                this.user = user;
            } catch (error) {
                console.log('error');
                console.log(error);
            }
        }
        // post
        // put
        // patch
        // delete
    }
})