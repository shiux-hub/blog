<!-- 文章页面 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useData } from '@/composables/data'
import { generateId } from '@/utils/commonTools'
import { formatTimestamp } from '@/utils/helper'
import initFancybox from '@/utils/initFancybox'

const { page, theme, frontmatter } = useData()

// 评论元素
const commentRef = useTemplateRef('commentRef')

// 获取对应文章数据
const postMetaData = computed(() => {
  const postId = generateId(page.value.relativePath)
  return theme.value.postData.find(item => item.id === postId)
})

// 日期
const createdDate = computed(
  () => postMetaData.value && formatTimestamp(postMetaData.value?.date),
)
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
  <div
    v-if="postMetaData"
    class="animate-fade-up flex flex-col gap-8 delay-100 duration-600"
  >
    <div class="mt-4 space-y-6 pl-4 max-md:mt-8 max-md:px-8">
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
            class="bg-mask-inverse-background hover:bg-theme-op hover:text-theme flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold opacity-80"
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
            class="hover:bg-theme-op hover:text-theme flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold opacity-80"
          >
            <Icon icon="mingcute:hashtag-fill" class="size-4 opacity-60" />
            {{ item }}
          </a>
        </div>
      </div>
      <h1
        class="text-4xl leading-[1.2] font-bold max-md:text-center max-md:text-2xl max-md:leading-8"
      >
        {{ postMetaData.title || '未命名文章' }}
      </h1>
      <div class="flex items-center gap-6 opacity-80 max-md:justify-center">
        <span
          v-if="createdDate"
          v-tippy="`这篇文章创建于 <strong>${createdDate}</strong>`"
          class="flex items-center gap-1.5 rounded-lg text-sm opacity-80"
        >
          <Icon icon="mingcute:calendar-2-line" class="size-4" />
          {{ createdDate }}
        </span>
        <span
          v-if="updatedDate"
          v-tippy="`这篇文章更新于 <strong>${updatedDate}</strong>`"
          class="flex items-center gap-1.5 rounded-lg text-sm opacity-80"
        >
          <Icon icon="mingcute:time-fill" class="size-4" />
          {{ updatedDate }}
        </span>
        <!-- 热度 -->
        <span
          v-tippy
          class="hot flex items-center gap-1.5 rounded-lg text-sm opacity-80"
          title="热度"
        >
          <Icon icon="mingcute:fire-fill" class="size-4" />
          <span id="twikoo_visitors" class="artalk-pv-count">0</span>
        </span>
        <!-- 评论数 -->
        <span
          v-if="theme.comment.enable"
          class="hover:bg-theme-op hover:text-theme flex cursor-pointer items-center gap-1.5 rounded-lg text-sm opacity-80 transition-[color,background-color] duration-300"
          @click="commentRef?.scrollToComments"
        >
          <Icon icon="mingcute:chat-1-fill" class="size-4" />
          <span id="twikoo_comments" class="artalk-comment-count">0</span>
        </span>
      </div>
    </div>
    <div class="animate-fade-up flex gap-4 delay-300 duration-600">
      <article class="card w-full space-y-8 px-8 py-4 lg:w-[calc(100%-336px)]">
        <!-- 过期提醒 -->
        <div
          v-if="postMetaData?.expired >= 180"
          class="border-l-warning card mt-4 rounded-l-md border-l-6 px-5 py-3"
        >
          本文发表于
          <strong class="text-warning">{{ postMetaData?.expired }}</strong>
          天前，其中的信息可能已经时过境迁
        </div>
        <!-- AI 摘要 -->
        <ArticleGPT v-if="frontmatter.articleGPT" />
        <!-- 文章内容 -->
        <Content id="page-content" class="markdown-main-style" />
        <!-- 参考资料 -->
        <References v-if="frontmatter.references" />
        <!-- 版权 -->
        <Copyright
          v-if="frontmatter.copyright !== false"
          :post-data="postMetaData"
        />
        <!-- 其他信息 -->
        <div
          class="flex items-center justify-between gap-3 opacity-80 max-md:flex-col"
        >
          <div class="flex items-center space-x-3 max-md:flex-wrap">
            <a
              v-for="(item, index) in postMetaData.tags"
              :key="index"
              :href="`/pages/tags/${item}`"
              class="bg-card-border hover:text-theme hover:bg-theme-op flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold"
            >
              <Icon icon="mingcute:hashtag-fill" class="opacity-60" />
              {{ item }}
            </a>
          </div>
          <a
            href="https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre"
            class="bg-card-border hover:text-font-color hover:bg-error flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold"
            target="_blank"
          >
            <Icon icon="mingcute:report-line" />
            反馈与投诉
          </a>
        </div>
        <RewardBtn />
        <!-- 下一篇 -->
        <NextPost class="mb-0" />
        <!-- 相关文章 -->
        <RelatedPost class="mt-12" />
        <!-- 评论 -->
        <Comments ref="commentRef" />
      </article>
      <Aside show-toc class="hidden w-xs lg:flex" />
    </div>
  </div>
</template>
