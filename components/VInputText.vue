<template>
  <input
    :id="name"
    v-model="value"
    :type="type"
    class="rounded-0 border-gray_dark border-1 px-12 py-8 focus:(outline-none ring-2 ring-gray_dark border-0)"
    :autocomplete="autocomplete"
  />
  <small class="text-secondary text-14">{{ errorMessage }}</small>
</template>
<script setup>
import { useField } from 'vee-validate'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  autocomplete: {
    type: String,
    default: 'off'
  }
})
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name)
</script>
