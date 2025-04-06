<!-- 首页 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'
import { mainStore } from '@/store'

const {
  showHeader,
  category,
  tag,
  page = 1,
} = defineProps<{
  // 显示首页头部
  showHeader: boolean
  // 当前页数
  page?: number
  // 显示分类
  category?: string
  // 显示标签
  tag?: string
}>()
const { theme } = useData()
const store = mainStore()
// 每页文章数
const postSize = theme.value.postSize

// 列表总数量
const allListTotal = computed(() => {
  const data = category
    ? theme.value.categoriesData[category]?.articles
    : tag
      ? theme.value.tagsData[tag]?.articles
      : theme.value.postData
  // 返回数量
  return data ? data.length : 0
})

// 获得当前页数
function getCurrentPage() {
  if (category || tag) {
    if (typeof window === 'undefined')
      return 0
    const params = new URLSearchParams(window.location.search)
    const page = params.get('page')
    if (!page)
      return 0
    const currentPage = Number(page)
    return currentPage ? currentPage - 1 : 0
  }
  return page ? page - 1 : 0
}

// 根据页数计算列表数据
const postData = computed(() => {
  const page = getCurrentPage()
  let data = null
  // 分类数据
  if (category) {
    data = theme.value.categoriesData[category]?.articles
  }
  // 标签数据
  else if (tag) {
    data = theme.value.tagsData[tag]?.articles
  }
  // 文章数据
  else {
    data = theme.value.postData
  }
  // 返回列表
  return data ? data.slice(page * postSize, page * postSize + postSize) : []
})

// 恢复滚动位置
function restoreScrollY(val: boolean) {
  if (val)
    return
  const scrollY = store.lastScrollY
  // TODO: 没有实现
  nextTick().then(() => {
    // 平滑滚动
    window.scrollTo({
      top: scrollY,
      behavior: 'smooth',
    })
    // 清除滚动位置
    store.lastScrollY = 0
  })
}

// 监听加载结束
watch(
  () => store.loadingStatus,
  val => restoreScrollY(val),
)
</script>

<template>
  <div class="home">
    <Banner v-if="showHeader" :height="store.bannerType" />
    <div class="flex space-x-4">
      <div
        class="w-full transition-[width] duration-300 lg:w-[calc(100%-336px)]"
      >
        <!-- 分类总览 -->
        <TypeBar :type="tag ? 'tags' : 'categories'" />
        <!-- 文章列表 -->
        <PostList :list-data="postData" />
        <!-- 分页 -->
        <Pagination
          :total="allListTotal"
          :page="Number(page)"
          :limit="postSize"
          :use-params="category || tag ? true : false"
          :route-path="
            category
              ? `/pages/categories/${category}`
              : tag
                ? `/pages/tags/${tag}`
                : ''
          "
        />
      </div>
      <!-- 侧边栏 -->
      <Aside class="hidden w-xs lg:flex" />
    </div>
  </div>
</template>
