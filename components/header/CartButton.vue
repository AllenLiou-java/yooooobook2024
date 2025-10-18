<template>
    <div class="text-white cursor-pointer" @click="$emit('click')">
        <span
            class="material-icons align-text-top text-22 mr-2"
            :class="qty > 0 ? 'text-brown_light' : ''"
        >
            shopping_cart
        </span>
        <span class="text-14 align-middle" :class="qty > 0 ? 'text-brown_light' : ''"
            >購物車({{ qty }})</span
        >
    </div>
</template>

<script setup>
defineProps({ qty: { type: Number, default: 0 } })
defineEmits(['click'])
</script>

<style lang="scss" scoped></style>
