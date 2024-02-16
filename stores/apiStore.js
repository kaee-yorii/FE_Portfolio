import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', {
    actions: {
        // get
        async get(path) {
            // get api Uri
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            try {
                const data = await $fetch(apiUri + path, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                // return data
                return data
            } catch (error) {
                console.log('error');
                console.log(error);
            }
        },
        // post
        async post(path, data) {
            // get api Uri
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            const jsonData = JSON.stringify(data);

            try {
                const data = await $fetch(apiUri + path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                // return data
                return data
            } catch (error) {
                console.log('error');
                console.log(error);
            }
        },
        // put
        // patch
        // delete
        async delete(path) {
            // get api Uri
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            try {
                const data = await $fetch(apiUri + path, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                // RETURN DATA
                return data
            } catch (error) {
                console.log('error');
                console.log(error);
            }
        }
    }
})