<!-- 文章页面 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'
import { generateId } from '@/utils/commonTools'
import { formatTimestamp } from '@/utils/helper'
import initFancybox from '@/utils/initFancybox'
import { Icon } from '@iconify/vue'

const { page, theme, frontmatter } = useData()

// 评论元素
const commentRef = useTemplateRef('commentRef')

// 获取对应文章数据
const postMetaData = computed(() => {
  const postId = generateId(page.value.relativePath)
  return theme.value.postData.find(item => item.id === postId)
})

// 日期
const createdDate = computed(() => postMetaData.value && formatTimestamp(postMetaData.value?.date))
const updatedDate = computed(() => {
  if (page.value?.lastUpdated) {
    return formatTimestamp(page.value?.lastUpdated)
  }
  else if (postMetaData.value?.lastModified) {
    return formatTimestamp(postMetaData.value?.lastModified)
  }
  return null
})

onMounted(() => {
  initFancybox(theme.value)
})
</script>

<template>
  <div v-if="postMetaData" class="flex flex-col gap-8 animate-fade-up duration-600 delay-100">
    <div class="space-y-6 max-md:mt-8 mt-4 max-md:px-8 pl-4">
      <div class="flex items-center gap-3 max-md:justify-center">
        <a
          v-if="frontmatter.original"
          v-tippy
          href="/posts/cc"
          class="post-meta-original cat-item"
          title="该文章为原创文章，注意版权协议"
        >原创</a>
        <div class="categories max-md:mr-0">
          <a
            v-for="(item, index) in postMetaData.categories"
            :key="index"
            v-tippy="`查看更多<strong>【${item}】</strong>分类的文章`"
            :href="`/pages/categories/${item}`"
            class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-lg bg-mask-inverse-background opacity-80 hover:bg-theme-op hover:text-theme"
          >
            <Icon icon="mingcute:classify-2-fill" class="size-4" />
            {{ item }}
          </a>
        </div>
        <div class="flex items-center max-md:hidden">
          <a
            v-for="(item, index) in postMetaData.tags"
            :key="index"
            v-tippy="`查看更多<strong>【${item}】</strong>标签的文章`"
            :href="`/pages/tags/${item}`"
            class="flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-lg opacity-80 hover:bg-theme-op hover:text-theme"
          >
            <Icon icon="mingcute:hashtag-fill" class="opacity-60 size-4" />
            {{ item }}
          </a>
        </div>
      </div>
      <h1 class="text-4xl leading-[1.2] font-bold max-md:text-2xl max-md:text-center max-md:leading-8">
        {{ postMetaData.title || '未命名文章' }}
      </h1>
      <div class="flex items-center gap-6 opacity-80 max-md:justify-center">
        <span
          v-if="createdDate"
          v-tippy="`这篇文章创建于<strong>${createdDate}</strong>`"
          class="flex items-center gap-1.5 rounded-lg opacity-80 text-sm"
        >
          <Icon icon="mingcute:calendar-2-line" class="size-4" />
          {{ createdDate }}
        </span>
        <span
          v-if="updatedDate"
          v-tippy="`这篇文章更新于<strong>${updatedDate}</strong>`"
          class="flex items-center gap-1.5 rounded-lg opacity-80 text-sm"
        >
          <Icon icon="mingcute:time-fill" class="size-4" />
          {{ updatedDate }}
        </span>
        <!-- 热度 -->
        <span v-tippy class="flex items-center gap-1.5 rounded-lg opacity-80 text-sm hot" title="热度">
          <Icon icon="mingcute:fire-fill" class="size-4" />
          <span id="twikoo_visitors" class="artalk-pv-count">0</span>
        </span>
        <!-- 评论数 -->
        <span
          v-if="theme.comment.enable"
          class="flex items-center gap-1.5 rounded-lg opacity-80 text-sm transition-[color,background-color] duration-300 cursor-pointer hover:bg-theme-op hover:text-theme"
          @click="commentRef?.scrollToComments"
        >
          <Icon icon="mingcute:chat-1-fill" class="size-4" />
          <span id="twikoo_comments" class="artalk-comment-count">0</span>
        </span>
      </div>
    </div>
    <div class="flex animate-fade-up duration-600 delay-300 gap-4">
      <article class="py-4 px-8 space-y-8 w-full lg:w-[calc(100%-336px)] card">
        <!-- 过期提醒 -->
        <div v-if="postMetaData?.expired >= 180" class="mt-4 mb-8 py-3 px-5 border-l-6 border-warning rounded-l-md card">
          本文发表于
          <strong class="text-warning">{{ postMetaData?.expired }}</strong>
          天前，其中的信息可能已经事过境迁
        </div>
        <!-- AI 摘要 -->
        <ArticleGPT />
        <!-- 文章内容 -->
        <Content id="page-content" class="markdown-main-style" />
        <!-- 参考资料 -->
        <References />
        <!-- 版权 -->
        <Copyright
          v-if="frontmatter.copyright !== false"
          :post-data="postMetaData"
        />
        <!-- 其他信息 -->
        <div class="flex items-center justify-between gap-3 opacity-80 max-md:flex-col">
          <div class="flex items-center space-x-3 max-md:flex-wrap">
            <a
              v-for="(item, index) in postMetaData.tags"
              :key="index"
              :href="`/pages/tags/${item}`"
              class="flex items-center px-3 py-1.5 gap-1 text-sm font-bold rounded-lg bg-card-border hover:text-theme hover:bg-theme-op"
            >
              <Icon icon="mingcute:hashtag-fill" class="opacity-60" />
              {{ item }}
            </a>
          </div>
          <a
            href="https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre"
            class="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg font-bold bg-card-border hover:text-font-color hover:bg-error"
            target="_blank"
          >
            <Icon icon="mingcute:report-line" />
            反馈与投诉
          </a>
        </div>
        <RewardBtn />
        <!-- 下一篇 -->
        <NextPost />
        <!-- 相关文章 -->
        <RelatedPost class="mt-12" />
        <!-- 评论 -->
        <Comments ref="commentRef" />
      </article>
      <Aside show-toc class="w-xs hidden lg:flex" />
    </div>
  </div>
</template>
