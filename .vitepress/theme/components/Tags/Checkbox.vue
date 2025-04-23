<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const model = defineModel<boolean>()

// 点击切换
function checkboxClick() {
  model.value = !model.value
}
</script>

<template>
  <div
    class="group flex cursor-pointer items-center space-x-2"
    @click="checkboxClick"
  >
    <div
      class="border-card-border group-hover:border-theme relative size-5 items-center justify-center rounded-sm border-2 transition-[border,background-color] duration-300"
      :class="{ 'bg-theme': model }"
    >
      <Icon
        icon="mingcute:check-fill"
        class="text-card-background absolute size-3 scale-0 opacity-0 transition-[opacity,scale]"
        :class="{
          'scale-100 opacity-100': model,
        }"
      />
    </div>
    <slot />
  </div>
</template>
