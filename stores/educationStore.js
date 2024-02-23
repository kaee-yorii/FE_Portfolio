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

            console.log('data before validation');
            console.log(data);

            // validasi
            data = Validate(isEducation, data);

            console.log('data after validation');
            console.log(data);

            await Api.post('/education', data);
        }
    }
});