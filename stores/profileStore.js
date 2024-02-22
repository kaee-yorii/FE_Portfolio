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

            this.profile = await Api.put('/profile', formData);
        }, async update2(data, avatar) {
            const Api = useApiStore();

            // validasi
            data = Validate(isUpdateProfile, data);

            // fetch 1
            this.profile = await Api.put('/profile', data);

            if (avatar) {
                const formData = new FormData();
                formData.append('avatar', avatar)
            }

            // fetch 2
            this.profile = await Api.put('/profile', FormData);
        }
    }
});