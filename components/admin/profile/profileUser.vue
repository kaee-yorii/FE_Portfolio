<template>
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="flex flex-col gap-4">
            <!-- email -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">email</div>
                <input v-model="formData.email" type="text" placeholder="Email"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.email">{{ errors.email }}</div>
            </label>
            <!-- first name -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">First Name</div>
                <input v-model="formData.firstName" type="text" placeholder="First Name"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.firstName">{{ errors.firstName }}</div>
            </label>
            <!-- last name -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Last Name</div>
                <input v-model="formData.lastName" type="text" placeholder="Last Name"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.lastName">{{ errors.lastName }}</div>
            </label>
            <!-- date of birth -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0"> Date Of Birth</div>

                <DatePicker v-model="formData.dob" color="indigo">
                    <template #default="{ togglePopover }">
                        <button @click="togglePopover" class="btn btn-outline border-neutral/25">
                            {{ dayjs(formData.dob).format('D MMMM YYYY') }}
                        </button>
                    </template>
                </DatePicker>

                <div class="text-error text-right text-sm" v-if="errors.dob">{{ errors.dob }}</div>
            </label>
            <!-- address -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Address</div>
                <input v-model="formData.address" type="text" placeholder="Address"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.address">{{ errors.address }}</div>
            </label>
            <!-- city -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">City</div>
                <input v-model="formData.city" type="text" placeholder="City"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.city">{{ errors.city }}</div>
            </label>
            <!-- country -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Country</div>
                <input v-model="formData.country" type="text" placeholder="Country"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.country">{{ errors.country }}</div>
            </label>
            <!-- job -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Job</div>
                <input v-model="formData.job" type="text" placeholder="Job" class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.job">{{ errors.job }}</div>
            </label>
            <!-- phone -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Phone</div>
                <input v-model="formData.phone" type="text" placeholder="Phone"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.phone">{{ errors.phone }}</div>
            </label>
            <!-- website -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Website</div>
                <input v-model="formData.website" type="text" placeholder="Website"
                    class="input input-bordered w-full max-w-xs" />
                <div class="text-error text-right text-sm" v-if="errors.website">{{ errors.website }}</div>
            </label>
        </div>

        <div>
            <div>
                Avatar
                <div class="w-60 aspect-square bg-neutral/30 md:mx-auto rounded-xl">
                    <div v-if="!avatar" class="w-full h-full"></div>
                    <img v-else :src="avatar" class="object-cover min-h-full min-w-full">
                </div>
                <div class="flex md:justify-center mt-2">
                    <input @change="handleFile" accept="image/*" type="file"
                        class="file-input file-input-bordered w-full max-w-xs" />
                </div>
            </div>

            <!-- BIO -->
            <label class="form-control w-full">
                <div class="label label-text">Bio</div>
                <textarea v-model="formData.bio" placeholder="Bio" cols="30" rows="10"
                    class="textarea textarea-bordered"></textarea>
                <div class="text-error text-right text-sm" v-if="errors.bio">{{ errors.bio }}</div>
            </label>
        </div>
    </div>

    <!-- MODAL CONFIRMATION -->
    <div class="flex items-center gap-2">
        <label class="btn btn-neutral text-white mt-5 w-[320px]" @click="confirm = true">
            Save Changes
            <span v-show="isLoading" class="loading loading-spinner loading-md"></span>
        </label>
        <div class="text-xs text-error" v-if="fetchError">{{ fetchError }}</div>
    </div>

    <AdminUserModalConfirm :show="confirm" @close="confirm = false" @saved="handleUpdate">
        <h3 class="font-bold text-lg">Confirm To Processed</h3>
        <p class="py-4">Are You Sure To Change Profile?</p>
    </AdminUserModalConfirm>

    <!-- MODAL SUCCESS -->
    <AdminModalSuccess :show="success" @close="success = false" />
</template>

<script setup>
import Joi from 'joi';
import dayjs from 'dayjs';
import { DatePicker } from 'v-calendar';

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const ProfileStore = useProfileStore();
const isLoading = ref(false);

const formData = ref({
    email: ProfileStore.profile.email,
    firstName: ProfileStore.profile.firstName,
    lastName: ProfileStore.profile.lastName,
    dob: ProfileStore.profile.dob,
    address: ProfileStore.profile.address,
    city: ProfileStore.profile.city,
    country: ProfileStore.profile.country,
    job: ProfileStore.profile.job,
    phone: ProfileStore.profile.phone,
    bio: ProfileStore.profile.bio,
    website: ProfileStore.profile.website
});

// AVATAR
// valuenya = apiUri + avatar || null
const avatar = ref(
    ProfileStore.profile.avatar
        ? apiUri + ProfileStore.profile.avatar
        : null
)
let file_avatar = null;
const handleFile = (e) => {
    console.log(e);
    if (e.target.files.length) {
        const file = e.target.files[0];
        file_avatar = file;

        // convert file to dataurl
        // data yg bisa dibaca di tag <img src= />
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            avatar.value = reader.result;
        }
    }
}

const confirm = ref(false)
const success = ref(false)

const errors = ref({});
const fetchError = ref('');
const handleUpdate = async () => {
    // TODO confirmation, alert success

    // loading indicator
    if (isLoading.value == false) {
        isLoading.value == true;

        // reset error
        errors.value = {};
        fetchError.value = '';

        confirm.value = false;

        try {
            await ProfileStore.update(formData.value, file_avatar);
            isLoading.value = false;
            success.value = true;

        } catch (error) {
            console.log(error)
            isLoading.value = false;

            if (error instanceof Joi.ValidationError) {
                errors.value = joiError(error);
            } else {
                console.log(error)
            }
        }
    }
}

</script>

<style lang="scss" scoped></style>