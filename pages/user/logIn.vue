<template>
  <div>
    <div class="container text-gray_dark font-bold">
      <div
        class="flex ml-40 mt-30 mb-60 border border-solid border-blue_light py-30 lt-md:(flex-col ml-0)"
      >
        <div class="w-3/6 px-60 lt-md:(w-full mb-40 px-30)">
          <h2 class="text-blue_dark text-center mb-30">會員登入</h2>
          <form class="flex flex-col justify-center" @submit.prevent="onSubmit">
            <div class="flex flex-col gap-2 mb-16">
              <label class="mb-8" for="email">電子郵件 Email</label>
              <VInputText name="email" type="email" autocomplete="email" />
            </div>
            <div class="flex flex-col gap-2 mb-16">
              <label class="mb-8" for="password">密碼 Password</label>
              <VPassword input-id="password" name="password" :feedback="false" />
            </div>
            <p class="text-14 text-red-6">{{ errorMsg }}</p>
            <NuxtLink
              class="self-end text-gray_dark mb-16 pb-4 border-0 border-b-1 border-solid hover:text-black"
              to="/user/resetPassword"
              >忘記密碼?</NuxtLink
            >
            <button
              class="bg-blue text-white text-center p-12 mb-16 cursor-pointer border-0 hover:bg-blue_dark"
            >
              登入
            </button>
            <NuxtLink class="text-center" to="/user/signup"
              ><span
                class="text-gray_dark mb-16 pb-4 border-0 border-b-1 border-solid hover:text-black"
                >還不是會員嗎?馬上註冊!</span
              ></NuxtLink
            >
          </form>
        </div>
        <div class="w-1 h-auto bg-gray_light lt-md:(w-5/6 h-1 self-center my-40)"></div>
        <div class="w-3/6 px-60 text-center lt-md:(w-full mb-20 px-30)">
          <h2 class="text-blue_dark mb-30">您也可以使用下列方式登入</h2>
          <div class="h-[calc(100%-90px)] flex-center flex-col">
            <p class="text-16 mb-12">直接使用您的Google+登入，只需幾秒鐘</p>
            <GoogleLoginBtn />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const { $api } = useNuxtApp()
const { setUserLoggedin } = useUserStore()
const errorMsg = ref('')

useHead({
  title: '會員登入'
})

definePageMeta({
  title: '會員登入'
})

useSeoMeta({
  ogTitle: '會員登入 - 有良冊股份有限公司',
  ogImage: '/yooooobook.jpg',
  ogUrl: 'https://www.yooooobook.com/user/login'
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email('請確認Email是否正確').required('請填入Email'),
      password: yup.string().min(8, '密碼至少需要8位數').required('請填入密碼')
    })
  )
})

// const [email, emailAttrs] = defineField('email')
// const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  const { email, password } = values

  try {
    const { idToken, refreshToken, localId } = await signInPromise(email, password)

    const { userName } = await $api(
      apiList.member.getMemberInfo.serverPath.replace(':memberId', localId),
      {
        method: 'get',
        onRequest({ options }) {
          options.headers.set('idToken', idToken)
        }
      }
    )

    setUserLoggedin(idToken, refreshToken, userName)
  } catch (e) {
    const { statusCode, message } = e
    const errorMessage = mapErrorMessage(message, statusCode)

    errorMsg.value = errorMessage
  }

  // alert(JSON.stringify(values, null, 2))
})

const signInPromise = (email, password) => {
  const signIn = apiList.member.signIn

  return $api(signIn.serverPath, {
    method: signIn.method,
    body: { email, password }
  })
}
</script>

<style lang="scss" scoped></style>
