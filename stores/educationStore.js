import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';
import { isEducation } from '~/utils/educationVatidation';

export const useEducationStore = defineStore('education', {
    state: () => ({
        educations: null
    }),
    actions: {
        async get() {
            const Api = useApiStore();

            this.educations = await Api.get('/educations');
        },
        async remove(id) {
            const Api = useApiStore();
            await Api.delete('/education/' + id);
        },
        async create(data) {
            const Api = useApiStore();

            // validasi
            data = Validate(isEducation, data);

            await Api.post('/education', data);
        },
        async update(id, data) {
            console.log('masuk method education update')
            console.log(data)

            const Api = useApiStore();

            // validasi
            data = Validate(isEducation, data);

            await Api.put(`/education/${id}`, data);
        }
    }
});