<!-- 友情链接 -->
<script lang="ts" setup>
import linkData from '@/assets/linkData'
import { smoothScrolling } from '@/utils/helper'
import { Icon } from '@iconify/vue'

// 全部友链
const allLinkData = computed(() => {
  return linkData.flatMap(item => item.typeList)
})

// 随机跳转
function randomJump() {
  try {
    const friendList = allLinkData.value
    const randomList
      = friendList[Math.floor(Math.random() * friendList.length)]
    window.$message.warning(
      `您即将前往 ${randomList?.name}，请注意链接是否安全`,
      {
        close: true,
        duration: 2000,
      },
      () => {
        if (randomList?.url)
          window.open(randomList.url, '_blank')
      },
    )
  }
  catch (error) {
    console.error('友链随机访问时出错：', error)
    window.$message.error('友链随机访问时出错，请重试')
  }
}
</script>

<template>
  <div class="mb-16 space-y-8">
    <!-- 顶图 -->
    <Banner v-tippy type="page" title="友情链接" desc="与各位博主无限进步">
      <template #header-slot>
        <div class="flex items-start justify-end gap-5 max-md:hidden">
          <div
            class="btn hover:bg-theme border-card-border shadow-xm shadow-border-shadow text-theme bg-card-second-background hover:text-card-background hover:shadow-theme-op rounded-xl border px-4 py-3"
            @click="randomJump"
          >
            <Icon icon="mingcute:shuffle-2-fill" class="size-5" />
            <span class="name">随机访问</span>
          </div>
          <div
            class="btn hover:bg-theme border-card-border text-card-second-background shadow-xm bg-font-color hover:shadow-theme-op rounded-xl border px-4 py-3 hover:text-white"
            @click="smoothScrolling('#友情链接申请')"
          >
            <Icon icon="mingcute:arrow-right-circle-fill" class="size-5" />
            <span class="name">申请友链</span>
          </div>
        </div>
      </template>
    </Banner>
    <!-- 友链数据 -->
    <LinkList :list-data="linkData" :use-friends-link="true" />
  </div>
</template>
