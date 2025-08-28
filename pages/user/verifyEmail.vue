<template>
    <div class="container flex-center flex-col h-[calc(100vh-96px-346px)]">
        <Dialog
            v-model:visible="isDialogVisible"
            modal
            header="Email 信箱驗證"
            :style="{ width: '25rem' }"
            @after-hide="mailSent = false"
        >
            <div>
                <span class="text-surface-500 dark:text-surface-400 block mb-8"
                    >驗證信已寄出，請前往
                    <span class="text-secondary">Eamil 信箱</span> 驗證。</span
                >
                <span class="text-surface-500 dark:text-surface-400 block mb-8"
                    >※若收件匣無信件，請 <span class="text-secondary">檢查垃圾郵件匣</span>。</span
                >
                <div class="flex justify-end gap-2">
                    <Button type="button" label="了解" @click="isDialogVisible = false"></Button>
                </div>
            </div>
        </Dialog>

        <template v-if="data">
            <div class="text-center">
                <h1 class="mb-24">信箱驗證完成</h1>
                <NuxtLink
                    class="bg-secondary hover:bg-[#d80545] px-16 py-12 text-white font-bold cursor-pointer inline-block"
                    to="/bookstore"
                    >前往訂購書籍</NuxtLink
                >
            </div>
        </template>
        <template v-else>
            <h1 class="mb-24">信箱驗證失敗</h1>
            <p class="mb-16">{{ mapErrorMessage(error.data?.message, error.data?.statusCode) }}</p>
        </template>
    </div>
</template>

<script setup>
const { oobCode } = useRoute().query
const isDialogVisible = ref(false)

const { data, error } = useAsyncData('emailVerification', () => {
    if (oobCode) {
        return $fetch(apiList.member.confirmEmailVerification.serverPath, {
            method: apiList.member.confirmEmailVerification.method,
            body: {
                oobCode
            }
        })
    } else {
        navigateTo('/')
    }
})
</script>

<style lang="scss" scoped></style>
