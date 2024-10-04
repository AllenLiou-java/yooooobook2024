<template>
  <div class="bg-primary container">
    <button @click="addCount">加1</button>
    <p>{{ counter }}</p>
    <p>{{ doubleCount }}</p>

    <div class="max-w-320 h-180 myphoto"></div>

    <form @submit="onSubmit">
      <input v-model="field" v-bind="fieldProps" />
      <span>{{ errors.field }}</span>

      <button>Submit</button>
    </form>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useForm } from 'vee-validate'

definePageMeta({
  layout: 'custom-layout'
})
// Validation, or use `yup` or `zod`
function required(value) {
  return value ? true : 'This field is required'
}

// Create the form
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: {
    field: required
  }
})

// Define fields
const [field, fieldProps] = defineField('field')

// Submit handler
const onSubmit = handleSubmit((values) => {
  // Submit to API
  console.log(values)
})

const counterStore = useCounterStore()
const { addCount } = counterStore
const { counter, doubleCount } = storeToRefs(counterStore)
</script>

<style lang="scss">
.p-accordion-header {
  background-color: #003756;
}

.myphoto {
  @include bg-cover('https://news.immigration.gov.tw/Uploads/%E4%B8%AD%E7%A7%8B%E7%AF%802.jpg');
}
</style>
