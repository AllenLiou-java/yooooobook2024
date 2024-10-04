<template>
  <div class="card_doc relative inline-block max-w-250 pt-20">
    <div class="tag-wrapper">
      <div
        class="bg-gradient-to-b from-[#de9e00] to-[#d38f00] inline-block py-6 pl-16 pr-48 absolute top-[-20px] tag"
      >
        <span class="material-icons text-white text-28 mr-8 align-text-top"> task_alt </span>
        <span class="text-20 align-top" style="text-shadow: #000 1px 0 2px">{{
          feature.title
        }}</span>
      </div>
    </div>
    <div
      class="bg-[#fdc935] px-24 py-36 rounded-b-[6px] bg-gradient-to-b from-[#fcd768] to-[#fdc62b] h-170 flex items-center"
    >
      <span class="text-blue text-16">{{ feature.content }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  feature: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.card_doc {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.tag-wrapper {
  filter: drop-shadow(3px 6px 3px transparent);
}
.tag {
  clip-path: polygon(0 0, 85% 0%, 100% 50%, 85% 100%, 0 100%);
  border-radius: 10px 0px 0px 0;
  box-shadow: 2px 4px 6px 0px #ffffff;
}
</style>
