<template>
    <div class="container flex-center flex-col h-[calc(100vh-96px-346px)]">
        <template v-if="$route.params.mode === 'resetPassword'">
            <i class="i-me-verification-success size-80 text-blue mb-40" />
            <h1 class="mb-24">密碼變更成功</h1>
            <p class="mb-40 text-20">您的新密碼已設定完成，下次登入時請使用新密碼。</p>
        </template>
        <template v-if="$route.params.mode === 'verifyEmail'">
            <div class="flex-center flex-col">
                <i class="i-me-verification-success size-80 text-blue mb-40" />
                <h1 class="mb-24">信箱驗證成功</h1>
                <p class="mb-40 text-20">
                    歡迎加入有良冊，您的帳號已正式啟用，快開始探索更多優良的出版品吧！
                </p>
            </div>
        </template>
        <div class="flex-center gap-16">
            <NuxtLink
                class="bg-blue hover:bg-blue_dark px-16 py-12 text-white font-bold cursor-pointer inline-block"
                to="/"
                >前往首頁</NuxtLink
            >
            <NuxtLink
                class="bg-secondary hover:bg-[#d80545] px-16 py-12 text-white font-bold cursor-pointer inline-block"
                to="/bookstore"
                >前往購書專區</NuxtLink
            >
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: [
        function (to, from) {
            const modeParam = to.params.mode

            if (modeParam !== 'resetPassword' && modeParam !== 'verifyEmail') {
                return abortNavigation()
            }
        }
    ]
})
</script>

<style lang="scss" scoped></style>
