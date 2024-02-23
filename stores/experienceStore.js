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
        }
    }
});