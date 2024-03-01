import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';
// import { isEducation } from '~/utils/educationVatidation';

export const useSkillStore = defineStore('skill', {
    state: () => ({
        skills: null
    }),
    actions: {
        async get() {
            const Api = useApiStore();

            this.skills = await Api.get('/skills');
        },
        async remove(id) {
            const Api = useApiStore();
            await Api.delete('/skill/' + id);
        },
        async create(data) {
            const Api = useApiStore();

            // validasi
            data = Validate(isSkill, data);

            await Api.post('/skill', data);
        }
    }
});