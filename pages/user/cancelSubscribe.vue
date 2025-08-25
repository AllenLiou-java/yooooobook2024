<template>
    <div class="container flex-center flex-col h-full">
        <ClientOnly>
            <img class="w-240 mb-32" :src="imageSrc('/error/error_icon.png')" alt="error-icon" />
        </ClientOnly>
        <div class="text-blue_dark max-w-500 w-full bg-white flex-center flex-col p-32">
            <h1 class="text-64 mb-32">取消訂閱</h1>
            <div>
                <p class="text-32 mb-24">您將不再收到</p>
                <ol class="text-20 mt-0 mb-24 pl-20">
                    <li class="mb-12">有良冊的新書促銷通知。</li>
                    <li>公司登記相關法規更新通知。</li>
                </ol>

                <div class="flex flex-col gap-2 mb-16">
                    <label class="mb-8 font-600" for="email">Email</label>
                    <VInputText name="email" type="email" autocomplete="email" />
                </div>
                <div class="text-center">
                    <Button
                        type="button"
                        label="取消訂閱"
                        class="bg-blue text-white text-center p-12 mb-16 cursor-pointer border-0 hover:bg-blue_dark rounded-none w-120"
                        :loading="isUserLoading"
                        @click="onSubmit"
                    />
                    <NuxtLink class="block underline" to="/">前往首頁</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { imageSrc } = getImageSrc()
const { $api } = useNuxtApp()
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const userStore = useUserStore()
const { isUserLoading } = storeToRefs(userStore)

definePageMeta({
    layout: 'blue-layer'
})

const { notify } = useToastifyStore()

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        email: yup.string().email('請確認Email是否正確').required('請填入Email')
    })
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
    console.log('onsubmit')

    userStore.$patch((state) => {
        state.isUserLoading = true
    })
    const { email } = values
    const subscribe = false

    // 存入firebase
    const { data } = await $api('/api/addSubscribeList', {
        method: 'post',
        body: {
            email,
            subscribe
        }
    })

    // 寄出提醒信件
    await $api('/api/mail/subscribeNotice', {
        method: 'post',
        body: {
            email,
            subscribe,
            subscribeKey: data.name
        }
    })

    userStore.$patch((state) => {
        setTimeout(() => {
            state.isUserLoading = false
            notify('info', '已取消訂閱!')
            resetForm()
        }, 1000)
    })
})
</script>

<style lang="scss" scoped></style>
