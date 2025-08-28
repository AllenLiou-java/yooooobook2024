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

        <template v-if="emailVerified">
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
            <h1 class="mb-24">請再次驗證您的電子郵件地址</h1>
            <p class="mb-16">{{ verifyfailMessage }}</p>
            <div
                @click="sendEmailVerify"
                class="bg-secondary hover:bg-[#d80545] px-16 py-12 text-white font-bold cursor-pointer inline-block"
            >
                重發驗證信
            </div>
        </template>
    </div>
</template>

<script setup>
const { $api } = useNuxtApp()
const { oobCode } = useRoute().query
const userStore = useUserStore()
const { idToken, emailVerified } = storeToRefs(userStore)
const { notify } = useToastifyStore()
const isDialogVisible = ref(false)
const verifyfailMessage = ref('')

const confirmAndSaveEmailVerification = async () => {
    if (emailVerified.value) return
    if (!oobCode) return

    try {
        await $fetch(apiList.member.confirmEmailVerification.serverPath, {
            method: apiList.member.confirmEmailVerification.method,
            body: {
                oobCode
            }
        })
    } catch (e) {
        verifyfailMessage.value = mapErrorMessage(e.data?.message, e.data?.statusCode)
    }
}

const sendEmailVerify = async () => {
    const emailVerify = apiList.member.sendEmailVerify
    try {
        await $api(emailVerify.serverPath, {
            method: emailVerify.method,
            body: {
                idToken: idToken.value
            }
        })
        isDialogVisible.value = true
    } catch (e) {
        if (e.statusCode === 400 && e.message === 'INVALID_ID_TOKEN') {
            useCookie('userName').value = null
            useCookie('email').value = null
            useCookie('emailVerified').value = null
            useCookie('photoUrl').value = null
            useCookie('userId').value = null
            useCookie('idToken').value = null
            useCookie('refreshToken').value = null
            useCookie('signInProvider').value = null
            userStore.$reset()
            navigateTo('/user/login')
        } else {
            notify('error', e.message, e.statusCode)
        }
    }
}

onMounted(() => {
    confirmAndSaveEmailVerification()
})
</script>

<style lang="scss" scoped></style>
