<script lang="ts" setup>
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { theme } = useData()
const { loadingStatus } = storeToRefs(store)

// 显示提示
const showTip = ref(false)
const showTimeOut = ref<number>()

// 监听加载状态
watch(
  () => loadingStatus.value,
  (val) => {
    if (val) {
      showTimeOut.value = setTimeout(() => {
        showTip.value = true
      }, 3000)
    }
    else {
      showTip.value = false
      clearTimeout(showTimeOut.value)
    }
  },
)

onBeforeUnmount(() => {
  clearTimeout(showTimeOut.value)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div
        v-if="loadingStatus"
        class="bg-card-background fixed inset-0 z-9999 flex h-dvh w-dvw flex-col items-center justify-center"
        @click="loadingStatus = false"
      >
        <img
          :src="theme.siteMeta.logo"
          class="animate-loading size-25 duration-2000"
          alt="loading-logo"
        >
        <span
          v-show="showTip"
          class="absolute bottom-8 text-sm opacity-60 transition-opacity duration-300"
        >
          一直显示？点击任意区域即可关闭
        </span>
      </div>
    </Transition>
  </Teleport>
</template>
