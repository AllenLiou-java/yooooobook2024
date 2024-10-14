<template>
  <div class="container font-bold">
    <div
      class="ml-40 mt-30 mb-60 border border-solid border-blue_light px-20 py-30 lt-md:(flex-col ml-0)"
    >
      <h2 class="text-blue_dark mb-30 text-center">忘記密碼</h2>
      <form class="max-w-466 mx-auto" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-2 mb-16">
          <label class="mb-8" for="email">請輸入註冊時的電子郵件 Email</label>
          <VInputText name="email" type="email" autocomplete="email" />
        </div>

        <div class="flex">
          <button
            class="bg-blue text-white text-center p-12 cursor-pointer border-0 hover:bg-blue_dark mr-12 grow-3 lt-sm:grow-1"
          >
            送出
          </button>
          <NuxtLink
            class="bg-gray p-12 hover:bg-gray_dark grow-1 text-center lt-sm:grow-1"
            to="/user/login"
            ><span class="text-gray_dark text-white">返回</span></NuxtLink
          >
        </div>
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
      email: yup.string().email('請確認Email是否正確').required('請填入Email')
    })
  )
})

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<style lang="scss" scoped></style>
