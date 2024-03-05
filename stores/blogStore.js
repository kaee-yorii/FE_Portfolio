import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';

export const useBlogStore = defineStore('blog', {
    state: () => ({
        data: null
    }),
    getters: {
        blogs: (state) => state.data ? state.data.data : [],
        limit: (state) => state.data ? state.data.limit : 10,
        maxPage: (state) => state.data ? state.data.maxPage : 1,
        total: (state) => state.data ? state.data.total : 0,
    },
    actions: {
        async get(page = 1, search = '') {
            const Api = useApiStore();

            this.data = await Api.get(`/blogs?limit=12&page=${page}&search=${search}`)
        },
        async remove(id) {
            const Api = useApiStore();

            await Api.delete('/blog/' + id)
        },
        async update(data, avatar) {

            const Api = useApiStore();

            // validasi
            data = Validate(isUpdateBlog, data);
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

            this.blog = await Api.put('/blog', formData);
        }
    }
})