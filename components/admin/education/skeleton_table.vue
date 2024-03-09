<template>
    <!-- SKELETON TABLE -->
    <tbody>
        <!-- tampilkan skeleton -->
        <tr v-for="n in 10" :key="n">
            <th>
                <div class="skeleton w-40 h-6"></div>
            </th>
            <td>
                <div class="flex gap-3 justify-center">
                    <div class="skeleton w-20 h-6"></div>
                    <div class="skeleton w-20 h-6"></div>
                </div>
            </td>
            <td>
                <div class="skeleton w-20 h-6 mx-auto"></div>
            </td>
            <td>
                <div class="skeleton w-20 h-6 mx-auto"></div>
            </td>
            <td>
                <div class="flex justify-center gap-3">
                    <div class="skeleton rounded-full w-8 h-8"></div>
                    <div class="skeleton rounded-full w-8 h-8"></div>
                </div>
            </td>
        </tr>
    </tbody>
</template>