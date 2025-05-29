<script lang="ts" setup>
import type { Hitokoto } from '@/types/hitokoto'
import { Icon } from '@iconify/vue'
import { getHitokoto } from '@/api'
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { cn } from '@/utils'

const props = withDefaults(
  defineProps<{
    // 类型
    type?: string
    // 高度
    height?: string
    // 标题
    title?: string
    // 简介
    desc?: string
    // 注释
    footer?: string
    // 背景
    image?: string
  }>(),
  {
    type: 'text',
    height: 'half',
    title: '这里是标题',
    desc: '这里是简介',
  },
)

const store = mainStore()

const { theme } = useData()
const hitokotoData = ref<Hitokoto>()
let hitokotoTimeOut: number | null = null

// 获取一言数据
async function getHitokotoData() {
  try {
    const result = await getHitokoto()
    hitokotoData.value = result
  }
  catch (error) {
    window.$message.error('一言获取失败')
    console.error('一言获取失败：', error)
  }
}

// 滚动至首页
function scrollToHome() {
  const bannerDom = document.getElementById('main-banner')
  if (!bannerDom)
    return false
  scrollTo({
    top: bannerDom.offsetHeight,
    behavior: 'smooth',
  })
}

onMounted(() => {
  if (props.type === 'text') {
    hitokotoTimeOut = setTimeout(() => {
      getHitokotoData()
    }, 2000)
  }
})

onBeforeUnmount(() => {
  if (hitokotoTimeOut)
    clearTimeout(hitokotoTimeOut)
})
</script>

<template>
  <div
    v-if="type === 'text'"
    id="main-banner"
    class="flex h-75 animate-[fade-up_0.6s_0.1s_backwards] flex-col items-center justify-center transition-[height] duration-300 max-md:h-60 max-md:items-start"
    :class="{
      'h-[calc(100vh-70px)] animate-[fade-up_0.6s_0.5_forwards] pb-25 opacity-0':
        store.bannerType === 'full',
    }"
  >
    <h1 class="my-7 font-[Site_Title] text-5xl font-bold max-md:text-4xl">
      你好，欢迎来到{{ theme.siteMeta.title }}
    </h1>
    <div
      :class="
        cn(
          'w-4/5 animate-[fade-up-opacity_0.6s_0.1s_forwards] text-xl opacity-80 max-md:ml-2 max-md:h-12 max-md:text-lg',
          {
            'animate-[fade-up-opacity_0.8s_0.5s_forwards] opacity-0':
              store.bannerType === 'full',
          },
        )
      "
    >
      <Transition name="fade" mode="out-in">
        <span
          :key="hitokotoData?.hitokoto"
          class="line-clamp-2 text-center text-ellipsis max-md:text-left"
        >
          {{
            hitokotoData?.hitokoto
              ? hitokotoData?.hitokoto
              : theme.siteMeta.description
          }}
        </span>
      </Transition>
    </div>
    <Transition v-if="height === 'full'" name="fade" mode="out-in">
      <Icon
        v-if="height === 'full'"
        class="animate-move-down absolute bottom-15 left-[calc(50%-10px)] size-5 rotate-180 cursor-pointer"
        icon="mingcute:arrow-up-fill"
        @click="scrollToHome"
      />
    </Transition>
  </div>
  <div
    v-else-if="type === 'page'"
    class="card relative flex min-h-95 flex-col overflow-hidden bg-cover p-16 max-xl:min-h-75 max-md:min-h-65"
    :class="{ 'dark:text-white': image }"
    :style="{
      backgroundImage: image ? `url(${image})` : '',
    }"
  >
    <div class="bg-mask-second-background absolute inset-0 backdrop-blur-sm" />
    <div class="relative mb-8 flex items-center justify-between">
      <div class="flex flex-col">
        <span
          :class="
            cn('text-font-second-color text-sm', {
              'opacity-60': image,
            })
          "
        >{{ title }}</span>
        <span class="mt-3 text-4xl leading-[1.2] font-bold">{{ desc }}</span>
      </div>
      <div class="max-md:hidden">
        <slot name="header-slot" />
      </div>
    </div>
    <slot />
    <div
      class="mt-auto flex items-center justify-between"
      :class="{ 'text-white': image }"
    >
      <div class="text-font-second-color mt-auto opacity-80">
        {{ footer }}
      </div>
      <div class="max-md:hidden">
        <slot name="footer-slot" />
      </div>
    </div>
  </div>
</template>
