import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';

export const useExperienceStore = defineStore('education', {
    state: () => ({
        experiences: null
    }),
    actions: {
        async get() {
            const Api = useApiStore();

            this.experience = await Api.get('/experiences');
        },
        async remove(id) {
            const Api = useApiStore();

            await Api.delete('/experience/' + id);
        },
        async create(data) {
            const Api = useApiStore();

            // validasi data
            data = Validate(isExperience, data);

            await Api.post('/experience', data);
        },
        async update(id, data) {
            const Api = useApiStore();

            // validasi
            data = Validate(isExperience, data);

            await Api.put(`/experience/${id}`, data);
        }
    }
});