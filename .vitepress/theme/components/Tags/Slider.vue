<script lang="ts" setup>
const {
  value = 0.7,
  min = 0,
  max = 1,
  interval = 0.01,
} = defineProps<{
  value?: number
  min?: number
  max?: number
  interval?: number
}>()

defineEmits<{
  update: [value: number]
}>()

const VueSlider = defineAsyncComponent(() => import('vue-slider-component'))

const sliderValue = ref(value)

watch(
  () => value,
  val => (sliderValue.value = val),
)
</script>

<template>
  <ClientOnly>
    <VueSlider
      v-model="sliderValue"
      :min="min"
      :max="max"
      :interval="interval"
      tooltip="none"
      class="slider"
      @change="$emit('update', $event)"
    />
  </ClientOnly>
</template>

<style scoped>
.slider {
  width: 100% !important;
  height: auto !important;
  margin: 0 !important;
  padding: 0 4px !important;
  :deep(.vue-slider-rail) {
    height: 8px;
    background-color: var(--main-color-bg);
    border-radius: 25px;
    .vue-slider-process {
      border-radius: 25px;
      background-color: var(--main-color);
    }
    .vue-slider-dot {
      width: 16px;
      height: 16px;
      border: 1px solid var(--main-color-bg);
      background-color: var(--main-color);
      box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>
