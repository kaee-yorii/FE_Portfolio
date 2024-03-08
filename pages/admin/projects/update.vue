<template>
    <div v-if="data">
        <div class="font-semibold text-xl mb-4 pb-2 border-b border-b-neutral/10 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideBriefcase :size="30" /> Update Project: " {{ data.title }} "
            </div>
        </div>

        <label class="form-control w-full gap-4">
            <div class="label label-text">Title</div>
            <input v-model="formData.title" type="text" placeholder="Type Here" class="input input-bordered w-full" />
            <div class="text-error text-right text-sm" v-if="errors.title">{{ errors.title }}
            </div>
        </label>

        <!-- Photos -->
        <div class="my-4">
            <div class="label label-text pb-0">Photos</div>

            <div class="overflow-auto">
                <!-- loop photo preview -->
                <div class="flex flex-nowrap gap-4 overflow-x-auto">
                    <div v-for="(photo, i) in photo_previews" :key="(photo, i)"
                        class="min-w-60 aspect-video overflow-hidden rounded bg-neutral/10 justify-center items-center relative">
                        <img :src="photo" class="max-h-full max-w-full">

                        <!-- actions button -->
                        <div class="dropdown dropdown-end absolute right-0 top-0">
                            <div tabindex="0" role="button"
                                class="btn btn-sm px-1 bg-opacity-70 rounded-md m-1 border-0">
                                <LucideMoreVertical :size="16" />
                            </div>
                            <ul tabindex="0"
                                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                                <li>
                                    <button @click="photo_previews.splice(index, 1); file_photos.splice(index, 1)"
                                        class="btn btn-sm my-1 btn-error">
                                        <LucideTrash2 :size="16" />
                                        Remove
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <!-- dummy -->
                <div v-if="!photo_previews.length" class="h-32 lg-h-40 aspect-video rounded bg-neutral"></div>
            </div>

            <input @change="handleFile" multiple accept="image/*" :disabled="photo_previews.length >= 10" type="file"
                class="file-input file-input-bordered w-full max-w-xs" />
        </div>


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
                <div class="label label-text pb-0">Start Date</div>
                <DatePicker v-model="formData.startDate" color="indigo">
                    <template #default="{ togglePopover }">
                        <button @click="togglePopover" class="btn btn-outline border-neutral/25">
                            {{ dayjs(formData.startDate).format('D MMMM YYYY') }}
                        </button>
                    </template>
                </DatePicker>
            </div>
            <div class="form-control w-min text-nowrap">
                <div class="label label-text pb-0">End Date</div>
                <div class="flex items-center gap-3">
                    <DatePicker v-model="formData.endDate" color="indigo">

                        <template #default="{ togglePopover }">
                            <button @click="togglePopover" class="btn btn-outline border-neutral/25"
                                :disabled="isPresent">
                                {{ isPresent ? "-" : dayjs(formData.endDate).format('D MMMM YYYY') }}
                            </button>
                        </template>
                    </DatePicker>
                    <input type="checkbox" v-model="isPresent" class="checkbox" @change="handlePresent" /> Present
                </div>
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

        <!-- skill -->
        <div class="flex gap-2 items-center my-2">
            <div class="label label-text">Skills</div>
            <button class="btn btn-xs btn-neutral" @click="showSkillSelector = true">
                <LucidePlus :size="10" /> Add Skill
            </button>
        </div>
        <div class="card min-h-20 w-full bg-neutral/5 p-4 gap-3">
            <div class="flex flex-nowrap gap-2">
                <button v-for="skill in selectedSkills" :key="skill.id" class="btn btn-neutral btn-sm w-max">
                    <div v-html="skill.svg" class="w-6 h-6"></div>
                    {{ skill.title }}
                </button>
            </div>
        </div>

        <label class="form-control w-full gap-4">
            <div class="label label-text">Description</div>
            <textarea v-model="formData.description" class="textarea textarea-bordered" placeholder="Description"
                rows="6"></textarea>
            <div class="text-error text-right text-sm" v-if="errors.description">{{ errors.description }}
            </div>
        </label>



        <div class="flex justify-end gap-2 my-4">
            <NuxtLink to="/admin/blogs" class="btn">
                Cancel
            </NuxtLink>
            <button @click="showCreateConfirmation = true" class="btn btn-neutral">
                Save
            </button>
        </div>

    </div>

    <!-- skill selector -->
    <AdminProjectSkillSelector :show="showSkillSelector" :selected="selectedSkills" @close="showSkillSelector = false"
        @addSkill="addSkill" />

    <AdminUserModalConfirm :show="showCreateConfirmation" text_confirm="Save" @close="showCreateConfirmation = false"
        @saved="handleSave">
        Are you sure to save this new blog ?
    </AdminUserModalConfirm>
</template>

<script setup>
import dayjs from 'dayjs';
import { DatePicker } from 'v-calendar';
import Joi from 'joi';

const ProjectStore = useProjectStore();
const route = useRoute();
const { id } = route.query;

const data = await ProjectStore.getById(id);
console.log(data)

definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});


const SkillStore = useSkillStore();
onBeforeMount(async () => {
    await SkillStore.getSkillsByCategory();
});

const formData = ref({
    title: data ? data.title : '',
    description: data ? data.description : '',
    startDate: data ? data.startDate : new Date(),
    endDate: data ? data.endDate : new Date(),
    status: data ? data.status : 'ON_PROGRESS',
    url: data ? data.url : '',
    github: data ? data.github : '',
    gitlab: data ? data.gitlab : '',
    company: data ? data.company : ''
})

const isPresent = ref(true);
const handlePresent = (e) => {
    const checked = r.target.checked;
    formData.value.endDate = checked ? null : new Date()
}

const errors = ref({})
const showSkillSelector = ref(false);
const selectedSkills = ref([])
const addSkill = (skill) => {
    const index = selectedSkills.value.findIndex(s => {
        return s.id == skill.id
    });

    if (index == -1) {
        // tambahkan 
        selectedSkills.value.push(skill)
    } else {
        // hapuskan
        selectedSkills.value.splice(index, 1)
    }

    console.log(skill)
    console.log(index)
}

// PHOTO PREVIEW
const photo_previews = ref([]);
const file_photos = [];
const handleFile = (e) => {
    for (const file of e.target.files) {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (photo_previews.value.length < 10) {
                // tampung file
                file_photos.push(file);

                // tampung preview
                photo_previews.value.push(reader.result);
            }
        }
    }

    // reset input file selector
    e.target.value = ''
}

// handle save
const fetchError = ref({})
const showCreateConfirmation = ref(false)
const isLoading = ref(false)

const handleSave = async () => {
    //reset
    errors.value = {};
    fetchError.value = '';

    // hide confirmation
    showCreateConfirmation.value = false;

    try {
        isLoading.value = false
        const dataSave = { ...formData.value };

        // end data jika null, jadikan
        if (!dataSave.endDate) dataSave.endDate = '';

        // skill -> array of id
        const skill_ids = selectedSkills.value.map(s => s.id);

        await ProjectStore.create(dataSave, skill_ids, file_photos)

        // balik ke halaman
        navigateTo('/admin/projects')
    } catch (error) {
        isLoading.value = false;
        showCreateConfirmation.value = false

        if (error instanceof Joi.ValidationError) {
            // fetch error
            errors.value = joiError(error);
        } else {
            if (error.data) {
                fetchError.value = error.data.message
            } else {
                // code error
                console.log(error)
            }
        }
    }


}
</script>