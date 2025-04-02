<script lang="ts" setup>
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { theme } = useData()
const { footerIsShow } = storeToRefs(store)

// 视窗监听器
const observer = ref<IntersectionObserver>()

// 实时年份
const thisYear = computed(() => new Date().getFullYear())

// 监听页脚视窗
function isShowFooter() {
  const footerDom = document.getElementById('main-footer')
  if (!footerDom)
    return false
  if (observer.value)
    observer.value?.disconnect()
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      footerIsShow.value = !!entry.isIntersecting
    })
  })
  // 添加监视器
  observer.value?.observe(footerDom)
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
  <footer id="main-footer" class="flex mt-4 bg-card-background border border-card-border overflow-hidden animate-show transition duration-300">
    <div class="footer-content container flex flex-wrap items-center justify-between mx-auto text-font-color min-h-8 gap-2 px-6 py-4">
      <div class="copyright flex items-center">
        <span v-if="theme.startYear" class="time">@ {{ theme.startYear }} - {{ thisYear }} By </span>
        <a v-tippy title="前往我的主页" :href="theme.siteMeta.author.link" class="author link hover:text-foreground hover:bg-background" target="_blank">
          <img class="aspect-square w-5" src="/images/logo/logo.svg">{{ theme.siteMeta.author.name }}
        </a>
        <a v-if="theme.icp" class="icp link hover:text-foreground hover:bg-background" href="https://beian.miit.gov.cn/" target="_blank">
          <Icon icon="mingcute:safety-certificate-line" class="opacity-60" />
          {{ theme.icp }}
        </a>
      </div>
      <div class="meta flex items-center">
        <a class="link hover:text-foreground hover:bg-background" href="https://vitepress.dev/" target="_blank">
          <span class="opacity-80">Powered by</span>
          <span class="name">VitePress</span>
        </a>
        <a class="link hover:text-foreground hover:bg-background" href="https://github.com/imsyy/vitepress-theme-curve" target="_blank">
          <Icon icon="mingcute:palette-fill" />
          <span class="name">主题</span>
        </a>
        <a class="link hover:text-foreground hover:bg-background" href="https://blog.imsyy.top/rss.xml" target="_blank">
          <Icon icon="mingcute:rss-2-fill" />
          <span class="name">订阅</span>
        </a>
        <a
          v-tippy
          title="网站采用 署名-非商业性使用-禁止演绎 4.0 国际 标准"
          class="link hover:text-foreground hover:bg-background gap-1"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
          target="_blank"
        >
          <Icon icon="ri:creative-commons-line" />
          <Icon icon="ri:creative-commons-by-line" />
          <Icon icon="ri:creative-commons-nc-line" />
          <Icon icon="ri:creative-commons-sa-line" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "tailwindcss";

.footer-content {
  .link {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 8px;
    height: 38px;
    border-radius: 32px;
    transition:
      color 0.3s,
      background-color 0.3s;
    cursor: pointer;
    gap: 0.25rem;

    svg {
      @apply size-5;
    }
  }
  @media (max-width: 768px) {
    font-size: 14px;
    .meta {
      display: none;
    }
  }
  @media (max-width: 420px) {
    .copyright {
      .icp {
        svg {
          display: none;
        }
      }
    }
  }
}
</style>
