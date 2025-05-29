<!-- 下一篇文章 -->
<script lamg="ts" setup>
import { storeToRefs } from 'pinia'
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { cn } from '@/utils'
import { generateId } from '@/utils/commonTools'

const router = useRouter()
const store = mainStore()
const { theme, page } = useData()
const { footerIsShow, infoPosition } = storeToRefs(store)

// 文章信息
const observer = ref(null)
const isNextPost = ref(true)
const nextPostShow = ref(false)
const nextPostData = ref(null)

// 获取文章
function getNextPostData() {
  const { postData } = theme.value
  const { filePath } = page.value
  if (!postData || !filePath)
    return false
  // 本篇索引
  const postId = generateId(filePath)
  const postIndex = postData.findIndex(post => post.id === postId)
  // 是否有下一篇
  if (postIndex >= 0 && postIndex < postData.length - 1) {
    nextPostData.value = postData[postIndex + 1]
    isNextPost.value = true
    return true
  }
  // 是否有上一篇
  else if (postIndex > 0) {
    nextPostData.value = postData[postIndex - 1]
    isNextPost.value = false
    return true
  }
  // 如果没有任何文章
  nextPostData.value = null
  return false
}

// 监听文章视窗
function isShowNext() {
  const postDom = document.getElementById('page-content')
  if (!postDom)
    return false
  if (observer.value)
    observer.value?.disconnect()
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      nextPostShow.value = !entry.isIntersecting
    })
  })
  // 添加监视器
  observer.value?.observe(postDom)
}

watch(
  () => router.route?.path,
  () => {
    getNextPostData()
    isShowNext()
  },
)

onMounted(() => {
  getNextPostData()
  isShowNext()
})

onBeforeUnmount(() => {
  if (observer.value)
    observer.value?.disconnect()
})
</script>

<template>
  <div
    v-if="nextPostData"
    :class="
      cn(
        'card hover:bg-theme hover:border-theme hover:text-card-background hover:shadow-theme-op flex w-full cursor-pointer flex-col p-5 max-md:hidden',
        {
          'fixed right-5 bottom-5 z-100 w-75 translate-y-45 opacity-0':
            infoPosition === 'fixed',
          'translate-y-0 opacity-100':
            infoPosition === 'fixed' && nextPostShow && !footerIsShow,
        },
      )
    "
    @click="router.go(nextPostData?.regularPath)"
  >
    <span
      class="border-card-border mb-3 border-b border-dashed pb-2 text-sm opacity-80 transition-colors duration-300"
    >
      {{ isNextPost ? '下一篇阅读' : '阅读上一篇' }}
    </span>
    <span class="line-clamp-2 text-ellipsis">
      {{ nextPostData?.title || '暂无标题' }}
    </span>
  </div>
</template>
