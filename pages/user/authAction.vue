<template>
    <div class="container flex-center flex-col h-[calc(100vh-96px-346px)]">
        <template v-if="mode === 'verifyEmail'">
            <template v-if="verifyEmailData">
                <div class="flex-center flex-col">
                    <i class="i-me-verification-success size-80 text-blue mb-40" />
                    <h1 class="mb-24">信箱驗證成功</h1>
                    <p class="mb-40 text-20">
                        歡迎加入有良冊，您的帳號已正式啟用，快開始探索更多優良的出版品吧！
                    </p>
                    <div class="flex-center gap-16">
                        <NuxtLink
                            class="bg-blue hover:bg-blue_dark px-16 py-12 text-white font-bold cursor-pointer inline-block"
                            to="/"
                            >前往首頁</NuxtLink
                        >
                        <NuxtLink
                            class="bg-secondary hover:bg-[#d80545] px-16 py-12 text-white font-bold cursor-pointer inline-block"
                            to="/bookstore"
                            >前往書籍專區</NuxtLink
                        >
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="text-center">
                    <i class="i-me-verification-failed size-80 text-secondary mb-40" />
                    <h1 class="mb-24">信箱驗證失敗</h1>
                    <p class="text-24 mb-24">驗證連結無效或已逾期。</p>

                    <div v-if="!idToken">
                        <p class="mb-40">若要重新申請驗證信，需先登入會員</p>
                        <NuxtLink
                            class="w-full bg-blue hover:bg-blue_dark px-16 py-12 text-white font-bold cursor-pointer inline-block"
                            to="/user/login"
                            >會員登入</NuxtLink
                        >
                    </div>
                    <Button
                        v-else
                        type="button"
                        label="重新申請驗證信"
                        class="bg-blue text-white text-center p-12 cursor-pointer w-full border-0 hover:bg-blue_dark rounded-none"
                        :loading="isSentVerificationLoading"
                        :pt="{
                            loadingIcon: {
                                class: 'absolute left-[calc(50%-80px)]'
                            }
                        }"
                        @click="sendEmailVerify"
                    />
                    <!-- <NuxtLink
                        class="bg-secondary hover:bg-[#d80545] px-16 py-12 text-white font-bold cursor-pointer inline-block"
                        to="/user/login"
                        >會員登入</NuxtLink
                    > -->
                    <!-- <p>{{ verifyEmailData }}</p>
                    <p>{{ verifyEmailError?.data.message }}</p> -->
                </div>
            </template>
        </template>

        <template v-if="mode === 'resetPassword'">
            <template v-if="resetPasswordData">
                <div
                    style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    class="flex-center flex-col bg-gray_light py-48 px-32 rounded-3xl"
                >
                    <div class="border-blue border-solid inline-block p-10 rounded-full mb-24">
                        <i class="i-me-key size-36"></i>
                    </div>

                    <h1 class="mb-24">重設密碼</h1>
                    <div class="self-start">
                        <span class="mb-4 inline-block">Email帳號：</span>
                        <p class="mb-16 font-bold text-blue">{{ resetPasswordData.data.email }}</p>
                    </div>

                    <VPassword
                        class="mb-16"
                        input-id="password"
                        name="password"
                        placeholder="請輸入新密碼"
                    />

                    <Button
                        type="button"
                        label="儲存"
                        class="bg-blue text-white text-center p-12 mb-16 cursor-pointer w-full border-0 hover:bg-blue_dark rounded-none"
                        :loading="isUserLoading"
                        :pt="{
                            loadingIcon: {
                                class: 'absolute left-[calc(50%-36px)]'
                            }
                        }"
                        @click="onSubmit"
                    />
                </div>
            </template>
            <template v-else>
                <div class="text-center">
                    <div class="border-blue border-solid inline-block p-10 rounded-full mb-24">
                        <i class="i-me-key size-36"></i>
                    </div>
                    <h1 class="mb-24">重置連結已失效</h1>
                    <p>很抱歉，您的重置密碼連結已過期或無效。</p>

                    <button>重新申請重置密碼</button>
                </div>
            </template>
        </template>
    </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
const { $api } = useNuxtApp()

const userStore = useUserStore()
const { idToken } = storeToRefs(userStore)

const { mode, oobCode } = useRoute().query
const isSentVerificationLoading = ref(false)

const { data: verifyEmailData, error: verifyEmailError } = useAsyncData('verifyEmail', () => {
    if (mode === 'verifyEmail') {
        return $api(apiList.member.confirmEmailVerification.serverPath, {
            method: apiList.member.confirmEmailVerification.method,
            body: {
                oobCode
            }
        })
    } else {
        return null
    }
})

const { data: resetPasswordData, error: resetPasswordError } = useAsyncData('resetPassword', () => {
    if (mode === 'resetPassword') {
        return $api(apiList.member.verifyPasswordResetCode.serverPath, {
            method: apiList.member.verifyPasswordResetCode.method,
            body: {
                oobCode
            }
        })
    } else {
        return null
    }
})

const { notify } = useToastifyStore()

const confirmPasswordReset = async (password) => {
    if (!oobCode) return
    try {
        await $api(apiList.member.confirmPasswordReset.serverPath, {
            method: apiList.member.confirmPasswordReset.method,
            body: {
                oobCode,
                newPassword: password
            }
        })

        notify('info', '密碼更新成功')
    } catch (e) {
        notify('error', '您的密碼重設要求已過期，或是先前已使用過重設密碼的連結')
    }
}

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        password: yup.string().min(8, '密碼至少需要8位數').required('請填入密碼')
    })
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
    confirmPasswordReset(values.password)
    resetForm()
})

const sendEmailVerify = async () => {
    isSentVerificationLoading.value = true
    const emailVerify = apiList.member.sendEmailVerify
    try {
        await $api(emailVerify.serverPath, {
            method: emailVerify.method,
            body: {
                idToken: idToken.value
            }
        })

        isSentVerificationLoading.value = false
    } catch (e) {
        notify('error', e.message, e.statusCode)
    }
}
</script>

<style lang="scss" scoped></style>
