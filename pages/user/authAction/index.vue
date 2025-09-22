<template>
    <div class="container flex-center flex-col h-[calc(100vh-96px-346px)]">
        <template v-if="mode === 'verifyEmail'">
            <template v-if="verifyEmailError">
                <div class="text-center">
                    <i class="i-me-verification-failed size-80 text-secondary mb-40" />
                    <h1 class="mb-24">信箱驗證失敗</h1>
                    <p class="text-24 mb-16">驗證連結無效或已逾期。</p>

                    <div v-if="!idToken">
                        <p class="mb-32">若要重新申請驗證信，需先登入會員</p>
                        <NuxtLink
                            class="w-full bg-blue hover:bg-blue_dark px-16 py-12 text-white font-bold cursor-pointer inline-block"
                            to="/user/logIn"
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
                </div>
            </template>
        </template>

        <template v-if="mode === 'resetPassword'">
            <template v-if="resetPasswordError">
                <div class="text-center">
                    <div class="border-blue border-solid inline-block p-10 rounded-full mb-24">
                        <i class="i-me-key size-36"></i>
                    </div>
                    <h1 class="mb-24">重置連結已失效</h1>
                    <p class="mb-16">很抱歉，您的重置密碼連結已過期或無效。</p>

                    <form class="flex flex-col gap-2">
                        <input
                            v-if="!idToken"
                            v-model="resetEmail"
                            v-bind="resetEmailAttrs"
                            name="email"
                            class="rounded-0 border-gray_dark border-1 px-12 py-8 focus:(outline-none ring-2 ring-gray_dark border-0) mb-4"
                            autocomplete="email"
                            placeholder="請輸入註冊時的電子郵件 Email"
                        />
                        <small class="text-secondary text-14 self-start mb-12">{{
                            emailErrors.email
                        }}</small>

                        <Button
                            type="button"
                            label="重新申請重置密碼"
                            class="bg-blue text-white text-center p-12 mb-16 cursor-pointer w-full border-0 hover:bg-blue_dark rounded-none"
                            :loading="isResetPasswordLoading"
                            :pt="{
                                loadingIcon: {
                                    class: 'absolute left-[calc(50%-85px)]'
                                }
                            }"
                            @click="onSubmitSendPasswordResetEmail"
                        />
                    </form>
                </div>
            </template>
            <template v-else>
                <div class="flex-center flex-col">
                    <div class="border-blue border-solid inline-block p-10 rounded-full mb-24">
                        <i class="i-me-key size-36"></i>
                    </div>

                    <h1 class="mb-24">重設密碼</h1>
                    <div class="self-start">
                        <span class="mb-4 inline-block">Email帳號：</span>
                        <p class="mb-16 font-bold text-blue">{{ resetPasswordData.data.email }}</p>
                    </div>

                    <div class="flex flex-col gap-2">
                        <form class="flex flex-col gap-2">
                            <Password
                                v-model="resetPassword"
                                v-bind="resetPasswordAttrs"
                                input-id="password"
                                input-class="rounded-0 border-gray_dark w-full  focus:(outline-none ring-2 ring-gray_dark border-0)"
                                prompt-label="請輸入8位數以上密碼"
                                weak-label="密碼強度：弱"
                                medium-label="密碼強度：中"
                                strong-label="密碼強度：強"
                                :toggle-mask="true"
                                :feedback="true"
                                class="mb-4"
                                placeholder="請輸入新密碼"
                            >
                                <template #footer>
                                    <Divider />
                                    <p class="mt-16">建議（非必要）</p>
                                    <ul class="pl-12 ml-12 mt-0 list-disc" style="line-height: 1.5">
                                        <li>至少一個大寫字元</li>
                                        <li>至少一個小寫字元</li>
                                        <li>至少一個數字</li>
                                    </ul>
                                </template>
                            </Password>
                            <small class="text-secondary text-14 self-start mb-12">{{
                                passwordErrors.password
                            }}</small>

                            <Button
                                type="button"
                                label="儲存"
                                class="bg-blue text-white text-center p-12 mb-16 cursor-pointer w-full border-0 hover:bg-blue_dark rounded-none"
                                :loading="isResetPasswordLoading"
                                :pt="{
                                    loadingIcon: {
                                        class: 'absolute left-[calc(50%-36px)]'
                                    }
                                }"
                                @click="passwordReset"
                            />
                        </form>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
const { $api } = useNuxtApp()

import Divider from 'primevue/divider'

const userStore = useUserStore()
const { idToken, email } = storeToRefs(userStore)

const { mode, oobCode } = useRoute().query
const isSentVerificationLoading = ref(false)
const isResetPasswordLoading = ref(false)

definePageMeta({
    middleware: [
        function (to, from) {
            if (Object.keys(to.query).length === 0) {
                return abortNavigation()
            }
        }
    ]
})

const { data: verifyEmailData, error: verifyEmailError } = await useAsyncData('verifyEmail', () => {
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

if (verifyEmailData.value) {
    navigateTo({
        name: 'user-authAction-mode-success',
        params: {
            mode: 'verifyEmail'
        }
    })
}

const { data: resetPasswordData, error: resetPasswordError } = await useAsyncData(
    'resetPassword',
    () => {
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
    }
)

const utilityStore = useUtilityStore()

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
        utilityStore.setVerifyEmailDialogVisible(true)
    } catch (e) {
        isSentVerificationLoading.value = false
        notify('error', e.message, e.statusCode)
    }
}

const { notify } = useToastifyStore()

// 密碼重置

const {
    handleSubmit: handleSubmitPasswordReset,
    defineField: definePasswordField,
    errors: passwordErrors
} = useForm({
    validationSchema: yup.object({
        password: yup.string().min(8, '密碼至少需要8位數').required('請填入密碼')
    })
})

const [resetPassword, resetPasswordAttrs] = definePasswordField('password')

const passwordReset = handleSubmitPasswordReset(async (values, { resetForm }) => {
    if (!oobCode) return
    const { password } = values

    isResetPasswordLoading.value = true

    // confirmPasswordReset
    try {
        await $api(apiList.member.confirmPasswordReset.serverPath, {
            method: apiList.member.confirmPasswordReset.method,
            body: {
                oobCode,
                newPassword: password
            }
        })

        resetForm()

        isResetPasswordLoading.value = false

        navigateTo({
            name: 'user-authAction-mode-success',
            params: {
                mode: 'resetPassword'
            }
        })
    } catch (e) {
        notify('error', '您的密碼重設要求已過期，或是先前已使用過重設密碼的連結')
        isResetPasswordLoading.value = false
    }
})

// 請求密碼重置信件

const {
    handleSubmit: handleSubmitPasswordResetEmail,
    defineField: defineEmailField,
    errors: emailErrors
} = useForm({
    validationSchema: yup.object({
        email: yup.string().email('請確認Email是否正確').required('請填入Email')
    })
})

const [resetEmail, resetEmailAttrs] = defineEmailField('email')

const sendPasswordResetEmail = async (email) => {
    const sendPasswordResetEmail = apiList.member.sendPasswordResetEmail
    try {
        await $api(sendPasswordResetEmail.serverPath, {
            method: sendPasswordResetEmail.method,
            body: {
                email
            }
        })

        utilityStore.setResetPasswordDialogVisible(true)
    } catch (e) {
        notify('error', e.message, e.statusCode)
    }
}

const onSubmitSendPasswordResetEmail = async () => {
    if (idToken.value) {
        isResetPasswordLoading.value = true
        await sendPasswordResetEmail(email.value)
        isResetPasswordLoading.value = false
    } else {
        handleSubmitPasswordResetEmail(async (values, { resetForm }) => {
            isResetPasswordLoading.value = true
            const { email } = values
            await sendPasswordResetEmail(email)

            resetForm()
            isResetPasswordLoading.value = false
        })()
    }
}
</script>

<style lang="scss" scoped></style>
