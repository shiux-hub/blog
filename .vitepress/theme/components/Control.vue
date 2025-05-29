<!-- 中控台 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { mainStore } from '@/store'
import { cn } from '@/utils'

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
        class="bg-mask-background-deep fixed inset-0 z-1100 flex h-svh w-svw items-center justify-center"
        @click="store.changeShowStatus('controlShow')"
      >
        <!-- 关闭按钮 -->
        <div
          ref="closeControlRef"
          class="hover:bg-theme hover:text-card-background absolute cursor-pointer rounded-full p-2 opacity-0 transition-[opacity,background-color,color] duration-300"
        >
          <Icon icon="mingcute:close-fill" class="size-5" />
        </div>
        <!-- 功能菜单 -->
        <div class="flex items-center gap-3">
          <div
            v-tippy
            class="bg-theme border-card-border cursor-pointer rounded-full border p-4 text-white transition-[background-color,scale] duration-300 hover:scale-105 active:scale-100"
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
            :class="
              cn(
                'bg-card-background border-card-border cursor-pointer rounded-full border p-4 transition-[background-color,scale] duration-300 hover:scale-105 active:scale-100',
                { 'bg-theme text-white': store.useRightMenu },
              )
            "
            title="右键菜单开关"
            @click.stop="rightMenuSwitch"
          >
            <Icon icon="majesticons:list-box" class="size-6" />
          </div>
          <div
            v-tippy
            :class="
              cn(
                'bg-card-background border-card-border cursor-pointer rounded-full border p-4 transition-[background-color,scale] duration-300 hover:scale-105 active:scale-100',
                { 'bg-theme text-white': store.playerShow },
              )
            "
            title="播放器开关"
            @click.stop="store.changeShowStatus('playerShow')"
          >
            <Icon icon="mingcute:music-2-fill" class="size-6" />
          </div>
          <div
            v-tippy
            :class="
              cn(
                'bg-card-background border-card-border cursor-pointer rounded-full border p-4 transition-[background-color,scale] duration-300 hover:scale-105 active:scale-100',
                { 'bg-theme text-white': store.backgroundBlur },
              )
            "
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
