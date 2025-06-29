<script lang="ts" setup>
import type { ImgHTMLAttributes } from 'vue'

defineProps<{
  src: ImgHTMLAttributes['src']
  alt?: ImgHTMLAttributes['alt']
}>()

const isLoading = ref(true)
const hasError = ref(false)

function onLoad() {
  isLoading.value = false
  hasError.value = false
}

function onError() {
  isLoading.value = false
  hasError.value = true
}
</script>

<template>
  <img
    v-show="!isLoading && !hasError"
    :src="src"
    :alt="alt"
    class="size-full object-cover opacity-0 transition-opacity duration-500 ease-in-out"
    :class="[{ 'opacity-100': !isLoading && !hasError }, $props.class]"
    @load="onLoad"
    @error="onError"
  >
  <div
    v-show="isLoading || hasError"
    class="bg-card-second-background absolute inset-0 size-full animate-pulse"
  />
</template>
