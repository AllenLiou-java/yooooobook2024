<template>
    <div v-if="pageInfo">
        <Dialog
            v-model:visible="isVisible"
            modal
            header="Email 信箱驗證"
            :showHeader="false"
            :style="{ width: '30rem', margin: '0px 16px', paddingTop: '24px' }"
        >
            <div class="flex-center flex-col">
                <div class="border-blue border-solid inline-block p-10 rounded-full mb-24">
                    <div class="i-me-rocket_launch size-36"></div>
                </div>
                <p class="font-bold mb-16 text-20">感謝您加入會員！</p>
                <p class="block mb-8">
                    驗證信已寄出，請前往
                    <span class="text-secondary">Eamil 信箱</span> 驗證！
                </p>
                <p class="block mb-24">
                    ※若收件匣無信件，請 <span class="text-secondary">檢查垃圾郵件匣</span>。
                </p>

                <Button
                    class="w-full"
                    type="button"
                    label="了解"
                    @click="changeDialogVisible(false)"
                ></Button>
            </div>
        </Dialog>

        <div class="relative text-white bg-gradient-to-r from-[#153D5B] to-[#082C4B]">
            <div class="container h-500 lt-md:h-360 relative flex items-end lt-sm:flex-col-reverse">
                <div class="w-full ml-40 mb-20 z-100">
                    <h1
                        class="relative text-52 before:(content-[''] absolute top-1/2 left-0 -translate-y-1/2 w-6 h-[80%] bg-[#35e3eb]) pl-20"
                    >
                        {{ pageInfo.name }}
                    </h1>
                    <hr class="bg-white mt-32 mb-24" />
                    <Breadcrumb :link-list="routeList" />
                </div>

                <img
                    class="ml-20 mb-20 w-253 lt-md:w-160"
                    :src="imageSrc('/home/Logo-1.png')"
                    alt="logoImg"
                />
            </div>
        </div>
        <NuxtPage @changeVisible="changeDialogVisible"></NuxtPage>
    </div>
    <div class="h-full" v-else>
        <NuxtPage></NuxtPage>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: (to, from) => {
        if (to.path === '/user') {
            return navigateTo({
                path: '/user/login'
            })
        }

        const idToken = useCookie('idToken')
        const signUpBlock = idToken.value && to.path === '/user/signup'
        const loginBlock = idToken.value && to.path === '/user/login'

        if (signUpBlock || loginBlock) {
            return navigateTo({
                path: '/'
            })
        }
    }
})

const { imageSrc } = getImageSrc()

const route = useRoute()

const pageInfo = computed(() => {
    const pages = [
        {
            path: '/user/login',
            name: '會員登入'
        },
        {
            path: '/user/signup',
            name: '會員註冊'
        },
        {
            path: '/user/resetPassword',
            name: '忘記密碼'
        }
    ]

    return pages.filter((page) => page.path === route.path)[0]
})

const routeList = computed(() => {
    return [
        {
            name: '首頁',
            linkTo: '/'
        },
        {
            name: `${pageInfo.value.name}`,
            linkTo: ''
        }
    ]
})

const isVisible = ref(false)

const changeDialogVisible = (status) => {
    isVisible.value = status
}
</script>

<style lang="scss" scoped></style>
