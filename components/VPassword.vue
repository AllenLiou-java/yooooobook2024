<template>
  <div class="flex flex-col gap-2">
    <Password
      v-model="value"
      :input-id="inputId"
      input-class="rounded-0 border-gray_dark w-full  focus:(outline-none ring-2 ring-gray_dark border-0)"
      prompt-label="請輸入8位數以上密碼"
      weak-label="密碼強度：弱"
      medium-label="密碼強度：中"
      strong-label="密碼強度：強"
      :toggle-mask="toggleMask"
      :feedback="feedback"
    >
      <template #footer>
        <Divider />
        <p class="mt-16">建議（非必要）</p>
        <ul class="pl-12 ml-12 mt-0 list-disc" style="line-height: 1.5">
          <li>至少一個大寫字元</li>
          <li>至少一個小寫字元</li>
          <li>至少一個數字</li>
        </ul>
      </template>
    </Password>
    <small class="text-secondary text-14">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import Divider from 'primevue/divider'

const props = defineProps({
  inputId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  toggleMask: {
    type: Boolean,
    default: true
  },
  feedback: {
    type: Boolean,
    default: true
  }
})
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name)
</script>

<style lang="scss" scoped></style>
