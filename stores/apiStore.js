import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', {
    actions: {
        // GET
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
                this.handleError(error)
            }
        },

        // POST
        async post(path, data) {
            // get api Uri
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            const jsonData = JSON.stringify(data);

            try {
                const response = await $fetch(apiUri + path, {
                    method: 'POST',
                    body: jsonData,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                // RETURN DATA
                return response
            } catch (error) {
                this.handleError(error)
            }
        },
        // HANDLE PUT & PATCH -> COPY DARI POST, KARENA PUT & PATCH ADA PARAMETER DATA
        // JAN LUPA GANTI METHOD ! 

        // PUT
        async put(path, data) {
            // get api Uri
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            if (!(data instanceof FormData)) {
                // jika data bukan formData, ubah ke json
                data = JSON.stringify(data);
            }

            try {
                const response = await $fetch(apiUri + path, {
                    method: 'PUT',
                    body: data,
                    // headers: {
                    //     'Content-Type': 'application/json'
                    // },
                    credentials: 'include'
                });

                // RETURN DATA
                return response
            } catch (error) {
                this.handleError(error)
            }
        },
        // PATCH
        async patch(path, data) {
            // get api Uri
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            const jsonData = JSON.stringify(data);

            try {
                const data = await $fetch(apiUri + path, {
                    method: 'PATCH',
                    body: jsonData,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                // RETURN DATA
                return data
            } catch (error) {
                this.handleError(error)
            }
        },
        // DELETE

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
                this.handleError(error)
            }
        },
        handleError(error) {
            // 401 UNAUTHORIZED
            if (error.status == 401) {
                // hapus token dari cookie
                const token = useCookie('token');
                token.value = '';

                // lempar ke hal login
                return navigateTo('/admin/login');

            }
            // BAD REQUEST
            if (error.status == 400) {
                throw error;
            }

            // UPDATE statusMessage -> error.data.message

            // selain 401 & 400
            throw createError({
                statusCode: error.status || 500,
                statusMessage: error.message || 'Internal Server Error!'
            });
        }
    }
})