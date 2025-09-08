<template>
    <div class="container font-bold">
        <Dialog
            v-model:visible="isDialogVisible"
            modal
            header="密碼重置"
            :showHeader="false"
            :style="{ width: '30rem', margin: '0px 16px', paddingTop: '24px' }"
            @after-hide="mailSent = false"
        >
            <div class="flex-center flex-col">
                <div class="border-blue border-solid inline-block p-10 rounded-full mb-24">
                    <div class="i-me-rocket_launch size-36"></div>
                </div>
                <p class="font-bold mb-16 text-20">重置信件已寄出囉！</p>
                <p class="block mb-16">
                    請前往
                    <span class="text-secondary">{{ email }}</span> 收取重置信喔！
                </p>
                <p class="block mb-24">
                    ※若收件匣無信件，請 <span class="text-secondary">檢查垃圾郵件匣</span>。
                </p>

                <Button
                    class="w-full"
                    type="button"
                    label="了解"
                    @click="isDialogVisible = false"
                ></Button>
            </div>
        </Dialog>
        <div
            class="ml-40 mt-30 mb-60 border border-solid border-blue_light px-20 py-30 lt-md:(flex-col ml-0)"
        >
            <h2 class="text-blue_dark mb-30 text-center">忘記密碼</h2>
            <div class="max-w-466 mx-auto">
                <div class="flex flex-col gap-2 mb-16">
                    <label class="mb-8" for="email">請輸入註冊時的電子郵件 Email</label>
                    <VInputText name="email" type="email" autocomplete="email" />
                </div>
                <p class="text-14 text-red-6">{{ errorMsg }}</p>
                <div class="flex">
                    <Button
                        type="button"
                        label="送出"
                        class="bg-blue text-white text-center p-12 cursor-pointer border-0 hover:bg-blue_dark mr-12 grow-3 lt-sm:grow-1 border-none rounded-none"
                        :loading="isUserLoading"
                        :pt="{
                            loadingIcon: {
                                class: 'absolute left-[calc(50%-36px)]'
                            }
                        }"
                        @click="onSubmit"
                    />

                    <div
                        class="bg-gray p-12 hover:bg-gray_dark grow-1 text-center lt-sm:grow-1 cursor-pointer"
                        @click="$router.back()"
                    >
                        <span class="text-gray_dark text-white">返回</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { storeToRefs } from 'pinia'

const isDialogVisible = ref(false)

const userStore = useUserStore()
const { isUserLoading, email } = storeToRefs(userStore)

useHead({
    title: '忘記密碼'
})

definePageMeta({
    title: '忘記密碼',
    middleware: 'logged-in-redirect'
})

useSeoMeta({
    ogTitle: '忘記密碼 - 有良冊股份有限公司',
    ogImage: '/yooooobook.jpg',
    ogUrl: 'https://www.yooooobook.com/user/resetPassword'
})

const { $api } = useNuxtApp()
const errorMsg = ref('')

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        email: yup.string().email('請確認Email是否正確').required('請填入Email')
    })
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
    userStore.$patch({
        isUserLoading: true
    })

    const { email } = values
    try {
        await sendPasswordResetEmailPromise(email)

        userStore.$patch({
            isUserLoading: false
        })

        isDialogVisible.value = true
        resetForm()
    } catch (e) {
        const { statusCode, message } = e
        const errorMessage = mapErrorMessage(message, statusCode)

        errorMsg.value = errorMessage

        userStore.$patch({
            isUserLoading: false
        })
    }
})

const sendPasswordResetEmailPromise = (email) => {
    const sendPasswordResetEmail = apiList.member.sendPasswordResetEmail

    return $api(sendPasswordResetEmail.serverPath, {
        method: sendPasswordResetEmail.method,
        body: {
            email
        }
    })
}
</script>

<style lang="scss" scoped></style>
