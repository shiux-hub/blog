<!-- 相关文章 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'
import { generateId } from '@/utils/commonTools'
import { shufflePost } from '@/utils/helper'
import { Icon } from '@iconify/vue'
import { isEmpty } from 'radashi'

const router = useRouter()
const { theme, page, frontmatter } = useData()

// 文章信息
const relatedData = ref<[]>()

// 获取同一分类的文章
function getRelatedData() {
  // 分类名
  const catName = frontmatter.value.categories?.[0]
  if (!catName)
    return
  // 指定分类数据
  const postData = theme.value.categoriesData?.[catName]?.articles
  // 本篇索引
  const postId = generateId(page.value?.filePath)
  // 过滤掉当前文章
  const filteredPosts = postData.filter(post => post.id !== postId)
  // 取出两篇文章
  relatedData.value = filteredPosts.slice(0, 2)
  if (isEmpty(relatedData.value)) {
    relatedData.value = undefined
  }
}

watch(
  () => router.route?.path,
  () => {
    getRelatedData()
  },
)

onMounted(() => {
  getRelatedData()
})
</script>

<template>
  <div v-if="relatedData" class="space-y-4">
    <div class="flex items-center justify-between w-full px-1.5">
      <span class="flex items-center gap-2 text-2xl font-bold">
        <Icon icon="mingcute:ai-fill" class="size-7" />
        相关推荐
      </span>
      <span class="opacity-60 text-sm transition-[color,opacity] cursor-pointer hover:opacity-100 hover:text-theme" @click="router.go(shufflePost(theme.postData))">
        随便逛逛
      </span>
    </div>
    <!-- 文章列表 -->
    <PostList :list-data="relatedData" simple />
  </div>
</template>
