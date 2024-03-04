import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';

export const useBlogStore = defineStore('blog', {
    state: () => ({
        data: null
    }),
    getters: {
        // blogs: (state) => {
        //     if (state) {
        //         // return klo ada data di state
        //         return state.data.data;
        //     }
        //     // default return
        //     return [];
        // },
        // limit: (state) => {
        //     if (state) {
        //         return state.data.limit
        //     }

        //     // default
        //     return 10;
        // },
        // maxPage: (state) => {
        //     if (state) {
        //         return state.data.maxPage
        //     }

        //     // default
        //     return 1;
        // },
        blogs: (state) => state ? state.data.blogs : 0,
        limit: (state) => state ? state.data.limit : 0,
        maxPage: (state) => state ? state.data.maxPage : 0,
        total: (state) => state ? state.data.total : 0,
    },
    actions: {
        async get() {
            const Api = useApiStore();

            this.data = await Api.get('/blogs')
        }
    }
})