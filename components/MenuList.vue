<template>
    <div class="w-full border border-gray_light border-solid p-24 lt-xl:(border-0 p-0)">
        <h2
            class="text-28 relative pl-16 py-4 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-2 h-[100%] bg-blue_dark)"
        >
            {{ menuName }}
        </h2>
        <hr class="bg-gray_light h-2 mb-0" />
        <ul
            class="flex flex-col lt-xl:(flex-row gap-16 w-70vw overflow-x-auto h-auto p-16) lt-sm:w-full"
        >
            <li
                class="border-0 border-b-1 border-solid border-gray_light text-20 lt-xl:(text-16 border-none rounded-full shrink-0 bg-brown overflow-hidden)"
                id="menuItem"
                v-for="data in dataList"
                :key="data.name"
            >
                <slot name="item" v-bind="data" />
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    dataList: {
        type: Array,
        default: []
    },
    menuName: {
        type: String,
        default: 'Menu'
    }
})
</script>

<style lang="scss" scoped>
::v-deep(#menuItem .router-link-exact-active) {
    color: #ffffff;
    background-color: #082c4b;
    &:hover {
        color: #ffffff;
    }
}
</style>
