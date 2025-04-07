<script lang="ts" setup>
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { calculateScroll, specialDayGray } from '@/utils/helper'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = mainStore()
const { frontmatter, page } = useData()
const {
  loadingStatus,
  footerIsShow,
  themeValue,
  themeType,
  backgroundType,
  fontFamily,
  fontSize,
} = storeToRefs(store)

// 右键菜单
const rightMenuRef = useTemplateRef('rightMenuRef')

// 判断是否为文章页面
const isPostPage = computed(() => {
  const routePath = decodeURIComponent(route.path)
  return routePath.includes('/posts/')
})

// 开启右键菜单
function openRightMenu(e: MouseEvent) {
  rightMenuRef.value?.openRightMenu(e)
}

// 复制时触发
function copyTip() {
  const copiedText = window.getSelection()?.toString()
  // 检查文本内容是否不为空
  if (
    copiedText
    && copiedText.trim().length > 0
    && typeof window.$message !== 'undefined'
  ) {
    window.$message.success('复制成功，在转载时请标注本文地址')
  }
}

// 更改正确主题类别
function changeSiteThemeType() {
  // 主题 class
  const themeClasses = ['dark', 'light', 'auto'] as const
  // 必要数据
  const htmlElement = document.documentElement

  console.log('当前模式：', themeType.value)
  // 清除所有 class
  Object.values(themeClasses).forEach((themeClass) => {
    htmlElement.classList.remove(themeClass)
  })
  // 添加新的 class
  if (themeType.value === 'auto') {
    // 根据当前操作系统颜色方案更改明暗主题
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    const autoThemeClass: 'dark' | 'light' = systemPrefersDark
      ? 'dark'
      : 'light'
    htmlElement.classList.add(autoThemeClass)
    themeValue.value = autoThemeClass
  }
  else {
    htmlElement.classList.add(themeType.value)
    themeValue.value = themeType.value
  }
  if (backgroundType.value === 'image') {
    htmlElement.classList.add('image')
  }
  else {
    htmlElement.classList.remove('image')
  }
}

// 切换系统字体样式
function changeSiteFont() {
  try {
    const htmlElement = document.documentElement
    htmlElement.classList.remove('lxgw', 'hmos')
    htmlElement.classList.add(fontFamily.value)
    htmlElement.style.fontSize = `${fontSize.value}px`
  }
  catch (error) {
    console.error('切换系统字体样式失败', error)
  }
}

// 监听设置变化
watch(
  () => [themeType.value, backgroundType.value],
  () => changeSiteThemeType(),
)
watch(
  () => fontFamily.value,
  () => changeSiteFont(),
)

onMounted(() => {
  // 全站置灰
  specialDayGray()
  // 更改主题类别
  changeSiteThemeType()
  // 切换系统字体样式
  changeSiteFont()
  // 挂载时执行
  calculateScroll()
  // 滚动监听
  window.addEventListener('scroll', calculateScroll)
  // 右键监听
  window.addEventListener('contextmenu', openRightMenu)
  // 复制监听
  window.addEventListener('copy', copyTip)
  // 监听系统颜色
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', changeSiteThemeType)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', calculateScroll)
  window.removeEventListener('contextmenu', openRightMenu)
})
</script>

<template>
  <!-- 背景图片 -->
  <Background />
  <!-- 加载提示 -->
  <Loading />
  <!-- 中控台 -->
  <Control />
  <!-- 导航栏 -->
  <Nav />
  <!-- 主内容 -->
  <main
    class="animate-show container mx-auto w-full px-6 py-4 duration-500"
    :class="{ 'hidden': loadingStatus, 'max-md:py-0': isPostPage }"
  >
    <!-- 404 -->
    <NotFound v-if="page.isNotFound" />
    <!-- 首页 -->
    <Home v-if="frontmatter.layout === 'home'" show-header />
    <!-- 页面 -->
    <template v-else>
      <!-- 文章页面 -->
      <Post v-if="isPostPage" />
      <!-- 普通页面 -->
      <Page v-else-if="!page.isNotFound" />
    </template>
  </main>
  <!-- 页脚 -->
  <footer
    class="to-card-background max-md:from-card-background mt-12 flex flex-col items-center gap-12 bg-linear-180 from-transparent to-25% max-md:z-999 max-md:mt-0"
  >
    <FooterLinks
      v-show="!loadingStatus"
      :show-bar="isPostPage && !page.isNotFound"
    />
    <Footer v-show="!loadingStatus" />
  </footer>
  <!-- 悬浮菜单 -->
  <Teleport to="body">
    <!-- 左侧菜单 -->
    <div
      class="fixed bottom-5 left-5 z-1002 transition-[opacity,transform] duration-300"
      :class="{ 'translate-y-25 opacity-0': footerIsShow }"
    >
      <!-- 全局设置 -->
      <Settings />
      <!-- 全局播放器 -->
      <Player />
    </div>
  </Teleport>
  <!-- 右键菜单 -->
  <RightMenu ref="rightMenuRef" />
  <!-- 全局消息 -->
  <Message />
</template>
