<template>
    <div v-if="pageInfo">
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
        <NuxtPage></NuxtPage>
    </div>
    <div class="h-full" v-else>
        <NuxtPage></NuxtPage>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: (to, from) => {
        if (to.fullPath === '/user') {
            return navigateTo({
                path: '/user/login'
            })
        }

        const idToken = useCookie('idToken')
        const signUpBlock = idToken.value && to.fullPath === '/user/signup'
        const loginBlock = idToken.value && to.fullPath === '/user/login'

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
            fullPath: '/user/login',
            name: '會員登入'
        },
        {
            fullPath: '/user/signup',
            name: '會員註冊'
        },
        {
            fullPath: '/user/resetPassword',
            name: '忘記密碼'
        }
    ]

    const fullPath = route.fullPath

    return pages.filter((page) => page.fullPath === fullPath)[0]
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
</script>

<style lang="scss" scoped></style>
