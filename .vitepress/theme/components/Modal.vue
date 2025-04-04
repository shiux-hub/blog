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
    show: false,
    title: '',
    titleIcon: '',
    showClose: true,
    maxWidth: 800,
    maxHeight: 80,
  },
)

// 发射事件
const emit = defineEmits<{
  // 遮罩层点击事件
  maskClick: []
  // 关闭事件
  modalClose: []
}>()

// 遮罩层事件
const maskClick = () => emit('maskClick')
const modalClose = () => emit('modalClose')

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
      <div v-if="show" class="modal">
        <div class="modal-mask" @click.stop="maskClick" />
        <div
          :style="{
            maxWidth: typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`,
          }"
          class="modal-main card"
          @click.stop
        >
          <!-- 标题 -->
          <div v-if="title" class="title">
            <div class="title-left">
              <Icon v-if="titleIcon" :icon="titleIcon" />
              <span class="title-text">{{ title }}</span>
            </div>
            <!-- 关闭按钮 -->
            <Icon
              v-if="showClose"
              icon="mingcute:close-fill"
              class="close"
              @click="modalClose"
            />
          </div>
          <!-- 弹窗内容 -->
          <div class="modal-content" :style="{ '--height': `${maxHeight}vh` }">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 2000;

  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--color-mask-background-deep);
  }

  .modal-main {
    position: absolute;
    padding: 0;
    animation: fade-up 0.5s forwards;
    width: calc(100% - 40px);
    overflow: hidden;

    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
      padding: 20px;
      height: 64px;
      background-color: var(--main-card-background);
      border-bottom: 1px solid var(--main-card-border);

      .title-left {
        width: 100%;

        svg {
          width: 1.25rem;
          height: 1.25rem;
          margin-right: 8px;
        }
      }

      .close {
        position: absolute;
        right: 20px;
        margin-right: 0;
        width: 1rem;
        height: 1rem;
        border-radius: 8px;
        padding: 8px;
        transition: background-color 0.3s;
        cursor: pointer;

        &:hover {
          background-color: var(--main-card-border);
        }
      }
    }

    .modal-content {
      max-height: calc(var(--height) - 46px);
      padding: 20px;
      overflow: auto;
    }
  }
}
</style>
