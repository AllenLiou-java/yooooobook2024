/* eslint-disable camelcase */
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useUserStore = defineStore('user', () => {
    const { $api } = useNuxtApp()
    const isUserLoggedIn = ref(false)
    const userName = ref('')
    const email = ref('')
    const emailVerified = ref(false)
    const photoUrl = ref('')
    const userId = ref('')
    const idToken = ref('')
    const refreshToken = ref('')
    const signInProvider = ref('')
    const isUserLoading = ref(false)

    const setUserLoggedin = async (id_token, refresh_token, name) => {
        const router = useRouter()
        const idTokenDecode = jwtDecode(id_token)

        isUserLoggedIn.value = true
        userName.value = idTokenDecode.name || name
        email.value = idTokenDecode.email
        emailVerified.value = idTokenDecode.email_verified
        photoUrl.value = idTokenDecode.picture
        userId.value = idTokenDecode.user_id
        idToken.value = id_token
        refreshToken.value = refresh_token
        signInProvider.value = idTokenDecode.firebase.sign_in_provider

        // 存入cookie
        useCookie('userName').value = idTokenDecode.name || name
        useCookie('email').value = idTokenDecode.email
        useCookie('emailVerified').value = idTokenDecode.email_verified
        useCookie('photoUrl').value = idTokenDecode.picture
        useCookie('userId').value = idTokenDecode.user_id
        useCookie('idToken').value = id_token
        useCookie('refreshToken').value = refresh_token
        useCookie('signInProvider').value = idTokenDecode.firebase.sign_in_provider

        // 若透過google auth 登入，則打Api將使用者資料存至firebase
        if (signInProvider.value === 'google.com') {
            const patchMemberInfo = apiList.member.patchMemberInfo
            const memberInfo = {
                userName: idTokenDecode.name,
                email: idTokenDecode.email,
                userUid: idTokenDecode.user_id,
                emailVerified: true,
                picture: idTokenDecode.picture
            }

            await $api(patchMemberInfo.serverPath.replace(':memberId', idTokenDecode.user_id), {
                method: patchMemberInfo.method,
                body: { memberInfo, idToken: id_token }
            })
        }

        router.back()
    }

    const setUserLogout = () => {
        isUserLoggedIn.value = false
        userName.value = ''
        email.value = ''
        emailVerified.value = ''
        photoUrl.value = ''
        userId.value = ''
        idToken.value = ''
        refreshToken.value = ''
        signInProvider.value = ''

        // 清除cookie
        useCookie('userName').value = null
        useCookie('email').value = null
        useCookie('emailVerified').value = null
        useCookie('photoUrl').value = null
        useCookie('userId').value = null
        useCookie('idToken').value = null
        useCookie('refreshToken').value = null
        useCookie('signInProvider').value = null

        // 導向至首頁
        // await navigateTo('/user/login')
        reloadNuxtApp()
    }

    const initProfile = () => {
        const cookieIdToken = useCookie('idToken').value
        const cookieRefreshToken = useCookie('refreshToken').value
        const cookieUserName = useCookie('userName').value
        const cookieEmailVerified = useCookie('emailVerified')

        if (cookieIdToken) {
            const idTokenDecode = jwtDecode(cookieIdToken)

            isUserLoggedIn.value = true
            userName.value = idTokenDecode.name || cookieUserName
            email.value = idTokenDecode.email
            emailVerified.value = cookieEmailVerified
            photoUrl.value = idTokenDecode.picture
            userId.value = idTokenDecode.user_id
            idToken.value = cookieIdToken
            refreshToken.value = cookieRefreshToken
            signInProvider.value = idTokenDecode.firebase.sign_in_provider
        }

        return true
    }

    function $reset() {
        isUserLoggedIn.value = false
        userName.value = ''
        email.value = ''
        emailVerified.value = false
        photoUrl.value = ''
        userId.value = ''
        idToken.value = ''
        refreshToken.value = ''
        signInProvider.value = ''
        isUserLoading.value = false
    }

    return {
        isUserLoggedIn,
        userName,
        email,
        emailVerified,
        photoUrl,
        userId,
        idToken,
        refreshToken,
        signInProvider,
        isUserLoading,
        setUserLoggedin,
        setUserLogout,
        initProfile,
        $reset
    }
})
