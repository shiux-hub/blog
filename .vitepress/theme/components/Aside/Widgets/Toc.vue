<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { throttle } from 'es-toolkit/function'
import { mainStore } from '@/store'

const route = useRoute()
const store = mainStore()

const tocData = ref<TocItem[]>()
const postDom = ref<HTMLElement | null>(null)
const activeHeader = ref<string>()
const activeTocHeight = ref(0)

interface TocItem {
  id: string
  type: string
  text?: string
}

// 获取所有目录数据
function getAllTitle() {
  try {
    postDom.value = document.getElementById('page-content')
    if (!postDom.value)
      return false
    // 所有标题
    const headers = Array.from(postDom.value.querySelectorAll('h2, h3')).filter(
      header => header.parentElement?.tagName.toLowerCase() === 'div',
    )
    return headers
  }
  catch (error) {
    console.error('获取所有目录数据出错：', error)
  }
}

// 生成目录数据
function generateDirData() {
  // 所有标题
  const headers = getAllTitle()
  if (!headers)
    return false
  // 构造目录数据
  const nestedData: TocItem[] = []
  headers.forEach((header) => {
    const headerObj: TocItem = {
      id: header.id,
      type: header.tagName,
      text: header.textContent?.replace(/\u200B/g, '').trim(),
    }
    // 放入标题内容
    nestedData.push(headerObj)
  })
  tocData.value = nestedData
}

// 高亮对应目录项
const activeTocItem = throttle(() => {
  if (!tocData.value)
    return false
  // 所有标题
  const headers = getAllTitle()
  if (!headers)
    return false
  // 容错高度
  const bufferHeight = 120
  // 遍历所有标题
  for (const header of headers) {
    const rect = header.getBoundingClientRect()
    // 检查标题是否在视口中
    if (rect.top - bufferHeight <= 0 && rect.bottom + bufferHeight >= 0) {
      // 高亮对应标题
      activeHeader.value = header.id
    }
  }
}, 100)

// 滚动标题至指定位置
function scrollToHeader(id: string) {
  try {
    const headerDom = document.getElementById(id)
    if (!headerDom || !postDom.value)
      return false
    const headerTop = headerDom.offsetTop
    const scrollHeight = headerTop + postDom.value.offsetTop - 80
    window.scroll({ top: scrollHeight, behavior: 'smooth' })
  }
  catch (error) {
    console.error('目录滚动失败：', error)
  }
}

// 是否回到顶部
watch(
  () => store.scrollData.percentage,
  (val) => {
    if (val === 0 && tocData.value) {
      console.log('回到顶部')
      // 所有标题
      const headers = getAllTitle()
      if (!headers)
        return false
      activeTocHeight.value = 0
      activeHeader.value = headers[0]?.id
    }
  },
)

// 计算目录滚动位置
watch(
  () => activeHeader.value,
  (val) => {
    const tocAllDom = document.getElementById('toc-all')
    const activeTocItem = document.getElementById(`toc-${val}`)
    if (!tocAllDom || !activeTocItem)
      return false
    activeTocHeight.value = activeTocItem?.offsetTop - 2 || 0
    tocAllDom?.scrollTo({
      top: activeTocHeight.value - 80,
      behavior: 'smooth',
    })
  },
)

watch(
  () => route.path,
  () => generateDirData(),
)

onMounted(() => {
  generateDirData()
  // 滚动监听
  window.addEventListener('scroll', activeTocItem)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', activeTocItem)
})
</script>

<template>
  <!-- 目录 -->
  <div v-if="tocData && tocData?.length" class="toc card">
    <div class="toc-title">
      <Icon icon="mingcute:menu-fill" />
      <span class="name">目录</span>
    </div>
    <div
      id="toc-all"
      class="toc-list"
      :style="{ '--height': `${activeTocHeight}px` }"
    >
      <span
        v-for="(item, index) in tocData"
        :id="`toc-${item.id}`"
        :key="index"
        class="toc-item"
        :class="[
          item.type,
          {
            active: item.id === activeHeader || (index === 0 && !activeHeader),
          },
        ]"
        @click="scrollToHeader(item.id)"
      >
        {{ item.text }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.toc {
  position: relative;
  padding: 0 !important;
  overflow: hidden;

  .toc-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    block-size: 58px;
    padding: 18px;

    svg {
      margin-inline-end: 8px;
      font-weight: bold;
      opacity: 60%;
    }

    .name {
      font-weight: bold;
    }
  }

  .toc-list {
    position: relative;
    display: flex;
    flex-direction: column;
    max-block-size: calc(70vb - 58px);
    padding: 20px;
    padding-block-start: 0;
    padding-inline-start: 24px;
    overflow: auto;

    .toc-item {
      padding: 6px 12px;
      margin: 4px 0;
      cursor: pointer;
      border-radius: 8px;
      opacity: 60%;
      transition:
        color 0.3s,
        opacity 0.3s,
        font-size 0.3s,
        background-color 0.3s;

      &.H2 {
        font-weight: bold;
      }

      &.H3 {
        margin-inline-start: 20px;
        font-size: 14px;
      }

      &.active {
        color: var(--color-theme);
        background-color: var(--color-theme-op);
        opacity: 100%;

        &.H2 {
          font-size: 18px;
        }

        &.H3 {
          font-size: 16px;
        }
      }

      &:first-child {
        margin-block-start: 0;
      }

      &:last-child {
        margin-block-end: 0;
      }

      &:hover {
        color: var(--color-theme);
        background-color: var(--color-theme-op);
        opacity: 100%;
      }
    }

    &::after {
      position: absolute;
      inset-block-start: var(--height);
      inset-inline-start: 12px;
      inline-size: 4px;
      block-size: 20px;
      margin: 8px 0;
      content: '';
      background-color: var(--color-theme);
      border-radius: 8px;
      transition: inset-block-start 0.3s;
    }
  }

  &::before {
    position: absolute;
    inset-block-end: 20px;
    inset-inline-start: 12px;
    inline-size: 4px;
    block-size: calc(100% - 78px);
    content: '';
    background-color: var(--color-card-border);
    border-radius: 8px;
  }
}
</style>
