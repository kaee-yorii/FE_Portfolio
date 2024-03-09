import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';

export const useSkillStore = defineStore('skill', {
    state: () => ({
        skills: null,
        categories: [],
        skillsByCategory: []
    }),
    actions: {
        async get() {
            const Api = useApiStore();
            const delayMinimal = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            })

            const response = await Promise.all([
                Api.get('/skills'),
                delayMinimal
            ]);

            this.skills = response[0];

            // RETURN VOID
        },
        async getCategories() {
            const Api = useApiStore();

            this.categories = await Api.get('/skill_categories');

            // RETURN VOID
        },
        async getSkillsByCategory() {
            const Api = useApiStore();

            this.skillsByCategory = await Api.get('/skill_by_category');

            // RETURN VOID
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
        },
        async update(id, data) {
            const Api = useApiStore();

            // validasi
            data = Validate(isSkill, data);

            await Api.put(`/skill/${id}`, data);
        }
    }
});