<template>
  <div class="container font-bold">
    <div
      class="ml-40 mt-30 mb-60 border border-solid border-blue_light px-20 py-30 lt-md:(flex-col ml-0)"
    >
      <h2 class="text-blue_dark mb-30 text-center">會員註冊</h2>
      <div class="max-w-466 mx-auto">
        <div class="flex flex-col gap-2 mb-16">
          <label class="mb-8" for="name">會員姓名 User name</label>
          <VInputText name="name" autocomplete="name" />
        </div>
        <div class="flex flex-col gap-2 mb-16">
          <label class="mb-8" for="email">電子郵件 Email</label>
          <VInputText name="email" type="email" autocomplete="email" />
        </div>
        <div class="flex flex-col gap-2 mb-16">
          <label class="mb-8" for="password">密碼 Password</label>
          <VPassword input-id="password" name="password" />
        </div>
        <div class="flex flex-col gap-2 mb-16">
          <label class="mb-8" for="passwordConfirm">再次確認密碼 Repeat Password</label>
          <VPassword input-id="passwordConfirm" name="passwordConfirm" :feedback="false" />
        </div>
        <p class="text-14 text-red-6 mb-12">{{ errorMsg }}</p>

        <Button
          type="button"
          label="註冊"
          class="bg-blue text-white text-center p-12 mb-16 cursor-pointer w-full border-0 hover:bg-blue_dark rounded-none"
          :loading="isUserLoading"
          :pt="{
            loadingIcon: {
              class: 'absolute left-[calc(50%-36px)]'
            }
          }"
          @click="onSubmit"
        />

        <NuxtLink class="text-center block" to="/user/login"
          ><span class="text-gray_dark mb-16 pb-4 border-0 border-b-1 border-solid hover:text-black"
            >已是會員了嗎？馬上登入！</span
          ></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { $api } = useNuxtApp()
const userStore = useUserStore()
const { isUserLoading } = storeToRefs(userStore)
const { notify } = useToastifyStore()
const errorMsg = ref('')

useHead({
  title: '會員註冊'
})

definePageMeta({
  title: '會員註冊'
})

useSeoMeta({
  ogTitle: '會員註冊 - 有良冊股份有限公司',
  ogImage: '/yooooobook.jpg',
  ogUrl: 'https://www.yooooobook.com/user/signup'
})

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('請填入會員姓名'),
    email: yup.string().email('請確認Email是否正確').required('請填入Email'),
    password: yup.string().min(8, '密碼至少需要8位數').required('請填入密碼'),
    passwordConfirm: yup
      .string()
      .min(8, '密碼至少需要8位數')
      .required('請填入密碼')
      .oneOf([yup.ref('password')], '與輸入的密碼不同，請再次確認')
  })
})

const onSubmit = handleSubmit(async (values) => {
  userStore.$patch({
    isUserLoading: true
  })

  try {
    const { name } = values
    const { idToken, email, localId } = await signUpPromise(values)

    await patchMemberInfoPromise({ name, email, localId }, idToken)
    await sendEmailVerifyPromise(idToken)

    userStore.$patch({
      isUserLoading: false
    })

    await navigateTo({
      path: '/user/login'
    })
    notify('info', '驗證信已寄出，請前往信箱驗證。')
  } catch (e) {
    const { statusCode, message } = e
    const errorMessage = mapErrorMessage(message, statusCode)

    errorMsg.value = errorMessage

    userStore.$patch({
      isUserLoading: false
    })
  }
})

const signUpPromise = (values) => {
  const registered = apiList.member.registered

  return $api(registered.serverPath, {
    method: registered.method,
    body: values
  })
}

const sendEmailVerifyPromise = (idToken) => {
  const emailVerify = apiList.member.sendEmailVerify

  return $api(emailVerify.serverPath, {
    method: emailVerify.method,
    body: {
      idToken
    }
  })
}

const patchMemberInfoPromise = (info, idToken) => {
  const patchMemberInfo = apiList.member.patchMemberInfo
  const memberInfo = {
    userName: info.name,
    email: info.email,
    userUid: info.localId,
    emailVerified: false,
    picture: ''
  }

  return $api(patchMemberInfo.serverPath.replace(':memberId', info.localId), {
    method: patchMemberInfo.method,
    body: { memberInfo, idToken }
  })
}
</script>

<style lang="scss" scoped></style>
