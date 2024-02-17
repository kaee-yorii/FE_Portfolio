<template>
    <div class="font-semibold mb-4 border-b-neutral/25">USER SETTING</div>

    <div class="flex flex-col gap 4">

        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Name</div>
            <input v-model="formData.name" type="text" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.name">{{ errors.name }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Email</div>
            <input v-model="formData.email" type="text" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.email">{{ errors.email }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Password</div>
            <input v-model="formData.password" type="Password" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.password">{{ errors.password }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text">Confirm Password</div>
            <input v-model="formData.confirm_password" type="password" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
            <div class="text-error text-right text-sm" v-if="errors.confirm_password">{{ errors.confirm_password }}</div>
        </label>
    </div>

    <!-- The button to open modal -->
    <label for="confirm" class="btn btn-neutral my-5">Update</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="confirm" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <form method="dialog">
                <label for="confirm" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">×</label>
            </form>
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Are You Sure?</p>
            <div class="modal-action">
                <label for="confirm" class="btn">Close!</label>
                <label for="confirm" @click="handleUpdate" class="btn btn-neutra">Update</label>
            </div>

        </div>
        <!-- click outside -->
        <form method="dialog" class="modal-backdrop">
            <label for="confirm">close</label>
        </form>
    </div>
</template>

<script setup>
// setup layout & middleware, lihat di /admin/index
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const AuthStore = useAuthStore();

const errors = ref({});

const formData = ref({
    name: AuthStore.user.name,
    email: AuthStore.user.email,
    password: '',
    confirm_password: ''
});

// const
// const handleUpdate = () => {

// }
</script>