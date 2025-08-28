<template>
    <div class="container font-bold">
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
                    <NuxtLink
                        class="bg-gray p-12 hover:bg-gray_dark grow-1 text-center lt-sm:grow-1"
                        to="/user/login"
                        ><span class="text-gray_dark text-white">返回</span></NuxtLink
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { isUserLoading } = storeToRefs(userStore)

useHead({
    title: '忘記密碼'
})

definePageMeta({
    title: '忘記密碼'
})

useSeoMeta({
    ogTitle: '忘記密碼 - 有良冊股份有限公司',
    ogImage: '/yooooobook.jpg',
    ogUrl: 'https://www.yooooobook.com/user/resetPassword'
})

const { $api } = useNuxtApp()
const errorMsg = ref('')
const { notify } = useToastifyStore()

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        email: yup.string().email('請確認Email是否正確').required('請填入Email')
    })
})

const onSubmit = handleSubmit(async (values) => {
    userStore.$patch({
        isUserLoading: true
    })

    const { email } = values
    try {
        await sendPasswordResetEmailPromise(email)

        userStore.$patch({
            isUserLoading: false
        })

        await navigateTo({
            path: '/user/login'
        })
        notify('info', '請前往信箱變更密碼。')
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
