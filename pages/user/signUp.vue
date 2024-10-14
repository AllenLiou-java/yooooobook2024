<template>
  <div class="container font-bold">
    <div
      class="ml-40 mt-30 mb-60 border border-solid border-blue_light px-20 py-30 lt-md:(flex-col ml-0)"
    >
      <h2 class="text-blue_dark mb-30 text-center">會員註冊</h2>
      <form class="max-w-466 mx-auto" @submit.prevent="onSubmit">
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
        <button
          class="bg-blue text-white text-center p-12 mb-16 cursor-pointer w-full border-0 hover:bg-blue_dark"
        >
          註冊
        </button>
        <NuxtLink class="text-center block" to="/user/login"
          ><span class="text-gray_dark mb-16 pb-4 border-0 border-b-1 border-solid hover:text-black"
            >已是會員了嗎？馬上登入！</span
          ></NuxtLink
        >
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      name: yup.string().required('請填入會員姓名'),
      email: yup.string().email('請確認Email是否正確').required('請填入Email'),
      password: yup.string().min(8, '密碼至少需要8位數').required('請填入密碼'),
      passwordConfirm: yup
        .string()
        .min(8, '密碼至少需要8位數')
        .required('請填入密碼')
        .oneOf([yup.ref('password')], '與輸入的密碼不同，請再次確認')
    })
  )
})

const onSubmit = handleSubmit((values, { resetForm }) => {
  alert(JSON.stringify(values, null, 2))
  resetForm()
})
</script>

<style lang="scss" scoped></style>
