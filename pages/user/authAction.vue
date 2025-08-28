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

        <template v-if="mode === 'verifyEmail'">
            <template v-if="verifyEmailData">
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
                <div class="text-center">
                    <h1 class="mb-24">請再次驗證您的電子郵件地址</h1>
                    <p>您的電子郵件地址驗證要求已過期，或是先前已使用過驗證電子郵件地址的連結</p>
                    <!-- <p>{{ verifyEmailData }}</p>
                    <p>{{ verifyEmailError?.data.message }}</p> -->
                </div>
            </template>
        </template>

        <template v-if="mode === 'resetPassword'">
            <template v-if="resetPasswordData">
                <div class="text-center">
                    <h1 class="mb-24">重設密碼</h1>
                    <p>登入帳號：{{ resetPasswordData.email }}</p>
                    <div class="flex flex-col gap-2 mb-16">
                        <label class="mb-8" for="password">密碼 Password</label>
                        <VPassword input-id="password" name="password" />
                    </div>

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
                    <h1 class="mb-24">請再次嘗試重設密碼</h1>
                    <p>您的密碼重設要求已過期，或是先前已使用過重設密碼的連結</p>
                    <!-- <p>{{ resetPasswordData }}</p>
                    <p>{{ resetPasswordError?.data.message }}</p> -->
                </div>
            </template>
        </template>
    </div>
</template>

<script setup>
const { mode, oobCode } = useRoute().query
const isDialogVisible = ref(false)
const userStore = useUserStore()
const { isUserLoading } = storeToRefs(userStore)
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { data: verifyEmailData, error: verifyEmailError } = useAsyncData('verifyEmail', () => {
    if (mode === 'verifyEmail') {
        return $fetch(apiList.member.confirmEmailVerification.serverPath, {
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
        return $fetch(apiList.member.verifyPasswordResetCode.serverPath, {
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
        await $fetch(apiList.member.confirmPasswordReset.serverPath, {
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

const onSubmit = handleSubmit(async (values) => {
    confirmPasswordReset(values.password)
})
</script>

<style lang="scss" scoped></style>
