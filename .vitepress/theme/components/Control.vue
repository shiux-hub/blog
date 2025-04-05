<!-- 中控台 -->
<script lang="ts" setup>
import { mainStore } from '@/store'
import { cn } from '@/utils'
import { Icon } from '@iconify/vue'

const store = mainStore()

const closeControlRef = useTemplateRef('closeControlRef')

// 更正关闭按钮位置
function changeCloseStyle() {
  nextTick().then(() => {
    const controlOpenDom = document.querySelector('#open-control')
    if (controlOpenDom && closeControlRef.value) {
      const { top, left } = controlOpenDom.getBoundingClientRect()
      closeControlRef.value.style.top = `${top}px`
      closeControlRef.value.style.left = `${left}px`
      closeControlRef.value.style.opacity = '1'
    }
  })
}

// 右键菜单开关
function rightMenuSwitch() {
  store.changeShowStatus('useRightMenu')
  window.$message.info(
    `${store.useRightMenu ? '已开启' : '已关闭'}自定义右键菜单`,
  )
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in" @before-enter="changeCloseStyle">
      <div
        v-if="store.controlShow"
        class="fixed inset-0 flex items-center bg-mask-background-deep justify-center w-svw h-svh z-1100"
        @click="store.changeShowStatus('controlShow')"
      >
        <!-- 关闭按钮 -->
        <div ref="closeControlRef" class="absolute p-2 opacity-0 transition-[opacity,background-color,color] hover:bg-theme hover:text-card-background duration-300 rounded-full cursor-pointer">
          <Icon icon="mingcute:close-fill" class="size-5" />
        </div>
        <!-- 功能菜单 -->
        <div class="flex items-center gap-3">
          <div
            v-tippy
            class="p-4 bg-theme text-white rounded-full cursor-pointer border border-card-border transition-[background-color,scale] duration-300 hover:scale-105 active:scale-100"
            title="显示模式切换"
            @click.stop="store.changeThemeType"
          >
            <Icon
              class="size-6"
              :icon="
                store.themeType === 'auto'
                  ? 'mingcute:history-anticlockwise-fill'
                  : store.themeType === 'dark'
                    ? 'mingcute:moon-fill'
                    : 'mingcute:sun-fill'
              "
            />
          </div>
          <div
            v-tippy
            :class="cn(
              'p-4 bg-card-background rounded-full cursor-pointer border border-card-border transition-[background-color,scale] duration-300 hover:scale-105 active:scale-100',
              { 'bg-theme text-white': store.useRightMenu },
            )"
            title="右键菜单开关"
            @click.stop="rightMenuSwitch"
          >
            <Icon icon="majesticons:list-box" class="size-6" />
          </div>
          <div
            v-tippy
            :class="cn(
              'p-4 bg-card-background rounded-full cursor-pointer border border-card-border transition-[background-color,scale] duration-300 hover:scale-105 active:scale-100',
              { 'bg-theme text-white': store.playerShow },
            )"
            title="播放器开关"
            @click.stop="store.changeShowStatus('playerShow')"
          >
            <Icon icon="mingcute:music-2-fill" class="size-6" />
          </div>
          <div
            v-tippy
            :class="cn(
              'p-4 bg-card-background border-card-border rounded-full cursor-pointer border transition-[background-color,scale] duration-300 hover:scale-105 active:scale-100',
              { 'bg-theme text-white': store.backgroundBlur },
            )"
            title="背景模糊开关"
            @click.stop="store.changeShowStatus('backgroundBlur')"
          >
            <Icon icon="mdi:blur" class="size-6" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
