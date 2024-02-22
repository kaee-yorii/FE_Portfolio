import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: null
    }),
    actions: {
        async get() {
            const Api = useApiStore();

            this.profile = await Api.get('/profile');
        },
        async update(data, avatar) {

            const Api = useApiStore();

            // validasi
            data = Validate(isUpdateProfile, data);
            console.log(data)

            // CARA PERTAMA
            const formData = new FormData();
            for (const [key, value] of Object.entries(data)) {
                console.log('key -> ' + key)
                console.log('value ->' + value)

                // append to formData
                // tidak boleh taruh data selain string
                if (value == null) {
                    value = '';
                }
                formData.append(key, value);
            }

            if (avatar) {
                // append avatar jika != null
                formData.append('avatar', avatar)
            }

            // CARA KEDUA

            this.profile = await Api.put('/profile', formData);
        }
    }
});