<script lang="ts" setup>
import type { Hitokoto } from '@/types/hitokoto'
import { getHitokoto } from '@/api'
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<{
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
}>(), {
  type: 'text',
  height: 'half',
  title: '这里是标题',
  desc: '这里是简介',
})
const store = mainStore()
const { theme } = useData()
const hitokotoData = ref<Hitokoto>()
let hitokotoTimeOut: number | null = null

// banner
const bannerType = ref<string>()

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

watch(
  () => store.bannerType,
  (val) => {
    bannerType.value = val
  },
)

onMounted(() => {
  if (props.type === 'text') {
    hitokotoTimeOut = setTimeout(() => {
      getHitokotoData()
    }, 2000)
  }
  // 更改 banner 类型
  bannerType.value = store.bannerType
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
    class="banner"
    :class="bannerType"
  >
    <h1 class="title">
      你好，欢迎来到{{ theme.siteMeta.title }}
    </h1>
    <div class="subtitle">
      <Transition name="fade" mode="out-in">
        <span :key="hitokotoData?.hitokoto" class="text">
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
        icon="mingcute:arrow-up-fill"
        @click="scrollToHome"
      />
    </Transition>
  </div>
  <div
    v-else-if="type === 'page'"
    class="banner-page card"
    :class="{ image }"
    :style="{
      backgroundImage: image ? `url(${image})` : '',
    }"
  >
    <div class="top">
      <div class="title">
        <span class="title-small">{{ title }}</span>
        <span class="title-big">{{ desc }}</span>
      </div>
      <div class="top-right">
        <slot name="header-slot" />
      </div>
    </div>
    <slot />
    <div class="footer">
      <div class="footer-left">
        {{ footer }}
      </div>
      <div class="footer-right">
        <slot name="footer-slot" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fade-up 0.6s 0.1s backwards;
  transition: height 0.3s;

  &.full {
    opacity: 0;
    height: calc(100vh - 70px);
    padding-bottom: 100px;
    animation: fade-up 0.6s 0.5s forwards;

    .subtitle {
      opacity: 0;
      animation: fade-up-opacity 0.8s 0.5s forwards;
    }
  }

  .title {
    font-family: 'Site Title';
    font-weight: bold;
    font-size: 2.75rem;
  }

  .subtitle {
    width: 80%;
    font-size: 1.25rem;
    opacity: 0.8;
    animation: fade-up-opacity 0.6s 0.1s backwards;

    .text {
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .icon-up {
    font-size: 20px;
    position: absolute;
    bottom: 60px;
    left: calc(50% - 10px);
    transform: rotate(180deg);
    animation: moveDown 2s ease-in-out infinite;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    height: 240px;

    .title {
      font-size: 2.25rem;
    }

    .subtitle {
      height: 50px;
      font-size: 1.125rem;
      margin-left: 8px;

      .text {
        text-align: left;
      }
    }
  }
}

.banner-page {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 380px;
  background-size: cover;

  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;

    .title {
      display: flex;
      flex-direction: column;

      .title-small {
        color: var(--color-font-second-color);
        font-size: 0.875rem;
      }

      .title-big {
        font-size: 2.25rem;
        font-weight: bold;
        line-height: 1.2;
        margin-top: 12px;
      }
    }
  }

  .footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;

    .footer-left {
      margin-top: auto;
      color: var(--color-font-second-color);
      opacity: 0.8;
    }
  }

  &.image {
    color: white !important;

    .top {
      .title-small {
        color: white;
        opacity: 0.6;
      }
    }

    .footer {
      .footer-left {
        color: white;
      }

      :deep(svg) {
        color: white !important;
      }
    }
  }

  @media (max-width: 1200px) {
    min-height: 300px;
  }

  @media (max-width: 768px) {
    min-height: 260px;

    .top-right,
    .footer-right {
      display: none;
    }
  }
}
</style>
