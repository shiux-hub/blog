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
      <div
        v-if="show"
        class="fixed inset-0 z-2000 flex h-dvh w-dvw items-center justify-center"
      >
        <div
          class="bg-mask-background-deep absolute inset-0 -z-1 size-full"
          @click.stop="$emit('maskClick')"
        />
        <div
          :style="{
            maxWidth: typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`,
          }"
          class="card absolute animate-[fade-up_0.5s_forwards] cursor-pointer p-0 duration-500"
          @click.stop
        >
          <!-- 标题 -->
          <div
            v-if="title"
            class="bg-card-background border-card-border flex h-16 items-center justify-center border-b p-5 text-lg"
          >
            <div class="w-full space-x-2">
              <Icon v-if="titleIcon" :icon="titleIcon" class="size-5" />
              <span class="title-text">{{ title }}</span>
            </div>
            <!-- 关闭按钮 -->
            <Icon
              v-if="showClose"
              icon="mingcute:close-fill"
              class="hover:bg-card-border absolute right-5 mr-0 size-4 cursor-pointer rounded-lg p-2 transition-[background-color] duration-300"
              @click="$emit('modalClose')"
            />
          </div>
          <!-- 弹窗内容 -->
          <div
            class="max-h-[calc(var(--height)-46px)] overflow-auto p-5"
            :style="{ '--height': `${maxHeight}vh` }"
          >
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
