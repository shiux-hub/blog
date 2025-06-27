<!-- 侧边栏 - 欢迎 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { sample } from 'es-toolkit/array'
import { useData } from '@/composables/data'
import { getGreetings } from '@/utils/helper'

const { theme } = useData()

// 问候数据
let helloTimeOut: number | undefined
const helloClick = ref(0)
const helloText = ref(getGreetings())
const router = useRouter()

// 恢复问候语
function resetHello() {
  helloClick.value = 0
  if (isHasUser())
    return false
  helloText.value = getGreetings()
}

// 更改问候语
function changeHello() {
  clearTimeout(helloTimeOut)
  helloClick.value++
  if (helloClick.value === 1) {
    helloText.value = '点这里干什么？'
  }
  else if (helloClick.value === 2) {
    helloText.value = '怎么还点？'
  }
  else if (helloClick.value === 3) {
    helloText.value = '那你点吧！'
  }
  else if (helloClick.value === 100) {
    helloText.value = '怎么还在点？？？'
  }
  else {
    helloText.value = `x ${helloClick.value - 3}`
  }
  // 恢复默认
  helloTimeOut = setTimeout(() => resetHello(), 3000)
}

// 是否具有用户
function isHasUser() {
  // 检查本地存储
  const userData = localStorage.getItem('ArtalkUser')
  if (!userData)
    return false
  // 获取用户数据
  const { nick } = JSON.parse(userData)
  const hello = ['很高兴见到你', '好久不见', '欢迎回来']
  // 随机问候语
  helloText.value = `${sample(hello)}，${nick}`
  return true
}

onMounted(() => {
  isHasUser()
})

onBeforeUnmount(() => {
  clearTimeout(helloTimeOut)
})
</script>

<template>
  <div class="flex flex-col items-center bg-theme text-card-background border-0 group card gap-5" @mouseleave="resetHello">
    <div class="min-w-35 text-center py-1.5 px-3 rounded-full text-sm font-bold bg-opacity cursor-pointer transition-[color,scale,background-color] duration-300 hover:bg-card-background hover:text-font-color hover:scale-110 active:scale-100" @click="changeHello">
      {{ helloText }}
    </div>
    <div class="relative flex items-center justify-center min-h-45">
      <div class="absolute size-40 origin-bottom duration-300 transition-[scale,opacity] ease-[cubic-bezier(0.69,0.39,0,1.21)] group-hover:opacity-0 group-hover:scale-0">
        <Clock />
      </div>
      <div class="h-full text-lg leading-[1.5] opacity-0 transition-opacity duration-300 group-hover:opacity-100" v-html="theme.aside.hello.text" />
    </div>
    <div class="flex items-center justify-between w-full">
      <div class="flex flex-col cursor-pointer transition-opacity duration-300 hover:opacity-90" @click="router.go('/pages/about')">
        <span class="font-bold text-lg">{{ theme.siteMeta.author.name }}</span>
        <span class="text-xs opacity-60">{{ theme.siteMeta.description }}</span>
      </div>
      <div class="flex items-center ml-5">
        <a
          v-tippy
          href="https://github.com/shiux-lab/"
          target="_blank"
          class="flex items-center justify-center text-card-background size-10 bg-opacity rounded-full hover:scale-110 hover:bg-card-background hover:text-font-color"
          title="GitHub"
        >
          <Icon icon="ri:github-line" class="size-5" />
        </a>
        <a
          v-tippy
          href="mailto:dropout.cn@gmail.com"
          target="_blank"
          title="发邮件给我"
          class="flex items-center justify-center text-card-background size-10 ml-3 bg-opacity rounded-full hover:scale-110 hover:bg-card-background hover:text-font-color"
        >
          <Icon icon="mdi:email-outline" class="size-5" />
        </a>
      </div>
    </div>
  </div>
</template>
