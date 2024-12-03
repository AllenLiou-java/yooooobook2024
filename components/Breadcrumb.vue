<template>
  <div>
    <NuxtLink
      v-for="(linkItem, idx) in linkList"
      :key="linkItem.name"
      class="text-white font-black"
      :style="{ color: textColor }"
      :to="linkItem.linkTo"
      >{{ linkItem.name }} <span v-if="idx < linkList.length - 1"> ＞ </span>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  linkList: {
    type: Object,
    required: true
  },
  textColor: {
    type: String,
    default: '#ffffff'
  }
})
</script>

<style lang="scss" scoped></style>
