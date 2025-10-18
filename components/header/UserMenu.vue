<template>
    <template v-if="!isUserLoggedIn">
        <NuxtLink no-prefetch to="/user/logIn" class="text-brown_light cursor-pointer">
            <span class="material-icons align-text-top text-22 mr-6"> person </span>
            <span class="text-16 align-middle">會員登入</span>
        </NuxtLink>
    </template>
    <template v-else>
        <div class="card flex justify-content-center relative cursor-pointer group">
            <div
                aria-haspopup="true"
                aria-controls="overlay_tmenu"
                class="font-black rounded-full border border-solid text-blue border-blue bg-white text-14 px-12 py-4 group-hover:( bg-brown_light)"
                :style="onPopup ? { backgroundColor: '#facc15' } : ''"
                @click="toggle"
            >
                <p class="w-120 whitespace-nowrap text-ellipsis overflow-hidden text-center">
                    {{ userName }}
                </p>
            </div>

            <TieredMenu
                id="overlay_tmenu"
                ref="menu"
                :model="loginMenu"
                popup
                @show="onPopup = true"
                @hide="onPopup = false"
            >
                <template #item="{ item, props }">
                    <template v-if="item.route">
                        <NuxtLink class="gap-8" :to="item.route" :class="props.action.class">
                            <span class="material-icons">
                                {{ item.icon }}
                            </span>
                            <span>{{ item.label }}</span>
                        </NuxtLink>
                    </template>
                    <template v-else>
                        <p class="px-12 py-8 gap-8" :class="props.action.class">
                            <span class="material-icons">
                                {{ item.icon }}
                            </span>
                            <span>{{ item.label }}</span>
                        </p>
                    </template>
                </template>
            </TieredMenu>
            <span
                class="material-icons text-20 text-gray bg-white rounded-full absolute end-[-10px] bottom-[-4px] absolute"
            >
                expand_circle_down
            </span>
        </div>
    </template>
</template>

<script setup>
const { $api } = useNuxtApp()
import TieredMenu from 'primevue/tieredmenu'
import { useConfirm } from 'primevue/useconfirm'
import { storeToRefs } from 'pinia'

const { notify } = useToastifyStore()
const utilityStore = useUtilityStore()
const userStore = useUserStore()
const { setUserLogout } = userStore
const { isUserLoggedIn, userName, idToken, signInProvider, email } = storeToRefs(userStore)

const confirm = useConfirm()
const confirmLogout = () => {
    confirm.require({
        group: 'headless',
        header: '登出',
        message: '確定要登出?',
        rejectLabel: '取消',
        acceptLabel: '登出',
        accept: () => {
            setUserLogout()
            notify('info', '登出成功')
        }
    })
}

const confirmResetPassword = () => {
    confirm.require({
        group: 'headless',
        header: '重設密碼',
        message: '確定要重設密碼?',
        rejectLabel: '取消',
        acceptLabel: '確定',
        accept: async () => {
            resetPassword()
        }
    })
}

const resetPassword = async () => {
    if (!idToken.value) return

    try {
        const { serverPath, method } = apiList.member.sendPasswordResetEmail
        await $api(serverPath, {
            method: method,
            body: {
                email: email.value
            }
        })
        utilityStore.setResetPasswordDialogVisible(true)
    } catch (e) {
        notify('error', e.message, e.statusCode)
    }
}

const confirmEmailVerify = async () => {
    const idToken = useCookie('idToken').value
    const emailVerified = useCookie('emailVerified').value
    if (emailVerified || !idToken) return

    try {
        const { serverPath, method } = apiList.member.sendEmailVerify
        await $api(serverPath, { method, body: { idToken } })
        utilityStore.setVerifyEmailDialogVisible(true)
    } catch (e) {
        notify('error', e.message, e.statusCode)
    }
}

const loginMenu = ref([])
const updateLoginMenuItem = () => {
    loginMenu.value = []

    if (!idToken.value) return
    loginMenu.value.push({
        label: '登出',
        icon: 'logout',
        command: () => {
            confirmLogout()
        }
    })
    if (signInProvider.value === 'password') {
        loginMenu.value.push({
            label: '重設密碼',
            icon: 'password',
            command: () => {
                confirmResetPassword()
            }
        })
    }
    const emailVerifiedCookie = useCookie('emailVerified').value

    if (!emailVerifiedCookie) {
        loginMenu.value.push({
            label: '信箱驗證',
            icon: 'verified',
            command: () => {
                confirmEmailVerify()
            }
        })
    }
}

watch(idToken, async (newVal, oldVal) => {
    if (import.meta.server) return
    if (!newVal) return
    await updateEmailVerify()
    updateLoginMenuItem()
})

// 更新emailVerified狀態
const updateEmailVerify = async () => {
    const idToken = useCookie('idToken').value
    if (!idToken || useCookie('emailVerified').value) return

    try {
        const { users } = await $api(apiList.member.getUserData.serverPath, {
            method: apiList.member.getUserData.method,
            body: {
                idToken
            }
        })
        const emailVerified = users?.[0]?.emailVerified
        if (emailVerified === undefined) return

        userStore.$patch({ emailVerified })
        useCookie('emailVerified').value = emailVerified
    } catch (e) {
        notify('error', e.message, e.statusCode)
    }
}

const menu = ref(null)
const onPopup = ref(false)

const toggle = (e) => menu.value.toggle(e)

onMounted(async () => {
    await updateEmailVerify()
    updateLoginMenuItem()
})
</script>

<style lang="scss" scoped></style>
