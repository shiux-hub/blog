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
  <div class="image-loader">
    <img
      v-show="!isLoading && !hasError"
      :src="src"
      :alt="alt"
      class="w-full h-full opacity-0 transition-opacity duration-500 ease-in-out"
      :class="[{ 'opacity-100': !isLoading && !hasError }, $props.class]"
      @load="onLoad"
      @error="onError"
    >
    <div v-show="isLoading || hasError" class="absolute top-0 left-0 w-full h-full bg-card-second-background animate-pulse" />
  </div>
</template>
