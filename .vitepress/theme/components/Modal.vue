<!-- 弹窗组件 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const props = withDefaults(
  defineProps<{
    // 是否显示
    show?: boolean
    // 标题
    title?: string
    // 标题图标
    titleIcon?: string
    // 是否显示关闭按钮
    showClose?: boolean
    // 最大宽度
    maxWidth?: number | string
    // 最大高度
    maxHeight?: number
  }>(),
  {
    showClose: true,
    maxWidth: 800,
    maxHeight: 80,
  },
)

// 发射事件
defineEmits<{
  // 遮罩层点击事件
  maskClick: []
  // 关闭事件
  modalClose: []
}>()

// 监听开启
watch(
  () => props.show,
  (val) => {
    document.body.style.overflowY = val ? 'hidden' : ''
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div v-if="show" class="fixed inset-0 flex items-center justify-center w-dvw h-dvh z-2000">
        <div class="absolute inset-0 size-full -z-1 bg-mask-background-deep" @click.stop="$emit('maskClick')" />
        <div
          :style="{
            maxWidth: typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`,
          }"
          class="absolute p-0 animate-[fade-up_0.5s_forwards] duration-500 card cursor-pointer"
          @click.stop
        >
          <!-- 标题 -->
          <div v-if="title" class="flex items-center justify-center text-lg p-5 h-16 bg-card-background border-b border-card-border">
            <div class="w-full space-x-2">
              <Icon v-if="titleIcon" :icon="titleIcon" class="size-5" />
              <span class="title-text">{{ title }}</span>
            </div>
            <!-- 关闭按钮 -->
            <Icon
              v-if="showClose"
              icon="mingcute:close-fill"
              class="absolute right-5 size-4 mr-0 rounded-lg p-2 cursor-pointer transition-[background-color] duration-300 hover:bg-card-border"
              @click="$emit('modalClose')"
            />
          </div>
          <!-- 弹窗内容 -->
          <div class=" max-h-[calc(var(--height)-46px)] p-5 overflow-auto" :style="{ '--height': `${maxHeight}vh` }">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
