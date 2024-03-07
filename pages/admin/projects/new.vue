<template>
    <div>
        <div class="font-semibold text-xl mb-4 pb-2 border-b border-b-neutral/10 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideBriefcase :size="30" /> New Project
            </div>
        </div>

        <label class="form-control w-full max-w-xs gap-4">
            <div class="label label-text">Title</div>
            <input v-model="formData.title" type="text" placeholder="Type Here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.title">{{ errors.title }}
            </div>
        </label>

        <div class="label label-text pb-0">Status Project</div>
        <div class="flex gap-2">
            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" value="ON_PROGRESS"
                        class="radio checked:bg-red-500" checked />
                    <span class="label-text">ON PROGRESS</span>
                </label>
            </div>

            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" value="MAINTENANCE"
                        class="radio checked:bg-red-500" checked />
                    <span class="label-text">MAINTENANCE</span>
                </label>
            </div>

            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" value="COMPLETE"
                        class="radio checked:bg-red-500" checked />
                    <span class="label-text">COMPLETE</span>
                </label>
            </div>
        </div>

        <div class="flex gap-3">
            <div class="form-control w-min text-nowrap">
                <div class="label label-text pb-0">Start Project</div>
                <DatePicker v-model="formData.startDate" color="indigo">
                    <template #default="{ togglePopover }">
                        <button @click="togglePopover" class="btn btn-outline border-neutral/25">
                            {{ dayjs(formData.startDate).format('D MMMM YYYY') }}
                        </button>
                    </template>
                </DatePicker>
            </div>
            <div class="form-control w-min text-nowrap">
                <div class="label label-text pb-0">End Project</div>
                <div class="flex items-center gap-3">
                </div>
                <DatePicker v-model="formData.endDate" color="indigo">

                    <template #default="{ togglePopover }">
                        <button @click="togglePopover" class="btn btn-outline border-neutral/25" :disabled="isPresent">
                            {{ isPresent ? "-" : dayjs(formData.endDate).format('D MMMM YYYY') }}
                        </button>
                    </template>
                </DatePicker>
                <input type="checkbox" v-model="isPresent" class="checkbox" @change="handlePresent" /> Present
            </div>

        </div>


        <div class="grid sm:grid-cols-2 gap-2">
            <label class="form-control w-full max-w-xs gap-4">
                <div class="label label-text">Company</div>
                <input v-model="formData.company" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.company">{{ errors.company }}
                </div>
            </label>

            <label class="form-control w-full max-w-xs gap-4">
                <div class="label label-text">Url</div>
                <input v-model="formData.url" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.url">{{ errors.url }}
                </div>
            </label>

            <label class="form-control w-full max-w-xs gap-4">
                <div class="label label-text">Github</div>
                <input v-model="formData.github" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.github">{{ errors.github }}
                </div>
            </label>

            <label class="form-control w-full max-w-xs gap-4">
                <div class="label label-text">Gitlab</div>
                <input v-model="formData.gitlab" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.gitlab">{{ errors.gitlab }}
                </div>
            </label>
        </div>

        <label class="form-control w-full max-w-xs gap-4">
            <div class="label label-text">Description</div>
            <textarea class="textarea textarea-bordered" placeholder="Description" rows="6"></textarea>
            <div class="text-error text-right text-sm" v-if="errors.description">{{ errors.description }}
            </div>
        </label>

    </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { DatePicker } from 'v-calendar';
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const errors = ref({})

const formData = ref({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'ON_PROGRESS',
    url: '',
    github: '',
    gitlab: '',
    company: ''
})

const isPresent = ref(true);
const handlePresent = (e) => {
    const checked = r.target.checked;
    formData.value.endDate = checked ? null : new Date()
}
</script>