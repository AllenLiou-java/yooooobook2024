/* eslint-disable camelcase */
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useUserStore = defineStore('user', () => {
  const isUserLoggedIn = ref(false)
  const userName = ref('')
  const email = ref('')
  const emailVerified = ref(false)
  const photoUrl = ref('')
  const userId = ref('')
  const idToken = ref('')
  const refreshToken = ref('')

  const setIdToken = (token) => {
    idToken.value = token
  }

  const setRefreshToken = (token) => {
    refreshToken.value = token
  }

  const setUserLoggedin = (id_token, refresh_token) => {
    const idTokenDecode = jwtDecode(id_token)

    isUserLoggedIn.value = true
    userName.value = idTokenDecode.name
    email.value = idTokenDecode.email
    emailVerified.value = idTokenDecode.email_verified
    photoUrl.value = idTokenDecode.picture
    userId.value = idTokenDecode.user_id
    idToken.value = id_token
    refreshToken.value = refresh_token

    // 打Api將使用者資料存至firebase

    // 存入cookie
    useCookie('userName').value = idTokenDecode.name
    useCookie('email').value = idTokenDecode.email
    useCookie('photoUrl').value = idTokenDecode.picture
    useCookie('userId').value = idTokenDecode.user_id
    useCookie('idToken').value = id_token
    useCookie('refreshToken').value = refresh_token

    navigateTo('/')
  }

  const setUserLogout = () => {
    isUserLoggedIn.value = false
    userName.value = ''
    email.value = ''
    emailVerified.value = ''
    photoUrl.value = ''
    userId.value = ''

    // 清除cookie
    useCookie('userName').value = null
    useCookie('email').value = null
    useCookie('photoUrl').value = null
    useCookie('userId').value = null
    useCookie('idToken').value = null
    useCookie('refreshToken').value = null

    // 導向至首頁
    // navigateTo('/')
  }

  const initProfile = () => {
    const cookieIdToken = useCookie('idToken').value
    const cookieRefreshToken = useCookie('refreshToken').value

    if (cookieIdToken) {
      const idTokenDecode = jwtDecode(cookieIdToken)
      isUserLoggedIn.value = true
      userName.value = idTokenDecode.name
      email.value = idTokenDecode.email
      emailVerified.value = idTokenDecode.email_verified
      photoUrl.value = idTokenDecode.picture
      userId.value = idTokenDecode.user_id
      idToken.value = cookieIdToken
      refreshToken.value = cookieRefreshToken
    }
    return true
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
    setUserLoggedin,
    setUserLogout,
    setIdToken,
    setRefreshToken,
    initProfile
  }
})
