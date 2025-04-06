<script lang="ts" setup>
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { theme } = useData()
const { footerIsShow } = storeToRefs(store)
const footerRef = useTemplateRef('footer-bar')

// 视窗监听器
const observer = ref<IntersectionObserver>()

// 实时年份
const thisYear = computed(() => new Date().getFullYear())

// 监听页脚视窗
function isShowFooter() {
  if (!footerRef.value)
    return false
  if (observer.value)
    observer.value?.disconnect()
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      footerIsShow.value = !!entry.isIntersecting
    })
  })
  // 添加监视器
  observer.value?.observe(footerRef.value)
}

onMounted(() => {
  isShowFooter()
})

onBeforeUnmount(() => {
  if (observer.value)
    observer.value?.disconnect()
})
</script>

<template>
  <div
    id="footer-bar"
    ref="footer-bar"
    class="bg-card-second-background border-card-border animate-show flex w-full overflow-hidden border transition duration-300"
  >
    <div
      class="text-font-color flex min-h-8 w-full flex-wrap items-center justify-between gap-2 px-6 py-4 max-md:justify-center max-md:gap-2 max-md:text-sm"
    >
      <div
        class="flex flex-wrap items-center gap-1 max-md:justify-center max-md:gap-2"
      >
        <span v-if="theme.startYear">@ {{ theme.startYear }} - {{ thisYear }} By
        </span>
        <a
          v-tippy
          title="前往我的主页"
          :href="theme.siteMeta.author.link"
          class="hover:text-theme hover:bg-theme-op inline-flex items-center gap-1 truncate rounded-full p-2 font-bold transition-colors duration-300"
          target="_blank"
        >
          <img class="aspect-square w-5" src="/images/logo/logo.svg">{{
            theme.siteMeta.author.name
          }}
        </a>
        <div
          class="text-font-second-color flex flex-wrap items-center gap-1 text-xs max-md:justify-center"
        >
          <a
            v-if="theme.icp"
            v-tippy
            title="前往工业和信息化部政务服务平台"
            class="hover:text-theme inline-flex items-center gap-1 truncate rounded-full px-2 font-normal transition-colors duration-300"
            href="https://beian.miit.gov.cn/#/Integrated/index"
            target="_blank"
          >
            <Icon
              icon="mingcute:safety-certificate-line"
              class="size-5 opacity-60 max-sm:hidden"
            />
            {{ theme.icp }}
          </a>
          <a
            class="hover:text-theme inline-flex items-center gap-1 truncate rounded-full px-2 font-normal transition-colors duration-300"
            rel="external nofollow"
            href="https://vitepress.dev/"
            target="_blank"
          >
            <span class="opacity-80">Powered by</span>
            <span>VitePress</span>
          </a>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2 max-md:justify-center">
        <a
          class="hover:text-theme hover:bg-theme-op inline-flex items-center gap-1 truncate rounded-full p-2 font-bold transition-colors duration-300"
          rel="external nofollow"
          href="https://github.com/imsyy/vitepress-theme-curve"
          target="_blank"
        >
          <Icon icon="mingcute:palette-fill" class="size-5" />
          <span>主题</span>
        </a>
        <a
          class="hover:text-theme hover:bg-theme-op inline-flex items-center gap-1 truncate rounded-full p-2 font-bold transition-colors duration-300"
          href="/rss.xml"
          target="_blank"
        >
          <Icon icon="mingcute:rss-2-fill" class="size-5" />
          <span>订阅</span>
        </a>
        <a
          v-tippy
          title="网站采用 署名-非商业性使用-禁止演绎 4.0 国际 标准"
          class="hover:text-theme hover:bg-theme-op inline-flex items-center gap-1 truncate rounded-full p-2 font-bold transition-colors duration-300"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
          target="_blank"
        >
          <Icon icon="ri:creative-commons-line" class="size-5" />
          <Icon icon="ri:creative-commons-by-line" class="size-5" />
          <Icon icon="ri:creative-commons-nc-line" class="size-5" />
          <Icon icon="ri:creative-commons-sa-line" class="size-5" />
        </a>
      </div>
    </div>
  </div>
</template>
