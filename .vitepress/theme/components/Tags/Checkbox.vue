<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const model = defineModel<boolean>()

// 点击切换
function checkboxClick() {
  model.value = !model.value
}
</script>

<template>
  <div class="checkbox" @click="checkboxClick">
    <div class="checkbox-box group" :class="{ check: model }">
      <Icon
        icon="mingcute:check-fill"
        class="text-card-background absolute size-3 scale-0 opacity-0 transition-[opacity,scale] group-hover:scale-100 group-hover:opacity-100"
      />
    </div>
    <div class="checkbox-label">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
  cursor: pointer;
  .checkbox-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-right: 8px;
    border: 1.5px solid var(--color-card-border);
    transition:
      border 0.3s,
      background-color 0.3s;
    &.check {
      background-color: var(--color-theme);
      svg {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
  &:hover {
    .checkbox-box {
      border-color: var(--color-theme);
    }
  }
}
</style>
