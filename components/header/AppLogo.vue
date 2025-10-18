<template>
    <div>
        <h1>
            <NuxtLink
                class="w-230 h-25 block bg-logo indent-[101%] whitespace-nowrap overflow-hidden"
                to="/"
                >有良冊股份有限公司</NuxtLink
            >
        </h1>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bg-logo {
    @include bg-cover('@/assets/images/home/Logo.png');
}
</style>
