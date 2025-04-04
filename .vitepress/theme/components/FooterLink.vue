<!-- 页脚 - 链接 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'
import { smoothScrolling } from '@/utils/helper'
import { Icon } from '@iconify/vue'

withDefaults(
  defineProps<{
    // 显示底栏
    showBar?: boolean
  }>(),
  {
    showBar: true,
  },
)
const { theme, site } = useData()
const { footer, siteMeta } = theme.value
// 社交链接数据
const socialLinkData = computed(() => {
  const halfLength = Math.ceil(footer.social.length / 2)
  const firstHalf = footer.social.slice(0, halfLength)
  const secondHalf = footer.social.slice(halfLength)
  return { first: firstHalf, second: secondHalf }
})
</script>

<template>
  <div class="footer-link">
    <div v-if="showBar" class="footer-bar">
      <span class="site-title">{{ site.title }}</span>
      <span class="site-desc">{{ site.description }}</span>
      <a href="/" class="to-home">了解更多</a>
    </div>
    <div
      class="footer-social mt-12 mb-4 flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-13"
    >
      <a
        v-for="({ link, icon, title }, index) in socialLinkData.first"
        :key="index"
        v-tippy="title"
        :href="link"
        target="_blank"
        class="social-link"
      >
        <Icon :icon />
      </a>
      <div
        v-tippy
        class="mx-4 size-15 cursor-pointer transition-transform duration-300 hover:scale-120 active:scale-100 max-md:hidden"
        title="返回顶部"
        @click="smoothScrolling()"
      >
        <img
          :src="siteMeta.author.cover"
          alt="author"
          class="author size-full"
        >
      </div>
      <a
        v-for="({ link, icon, title }, index) in socialLinkData.second"
        :key="index"
        v-tippy="title"
        :href="link"
        target="_blank"
        class="social-link"
      >
        <Icon :icon />
      </a>
    </div>
    <div class="footer-sitemap">
      <div
        v-for="(item, index) in footer.sitemap"
        :key="index"
        class="sitemap-item"
      >
        <span class="title">{{ item.text }}</span>
        <div class="links">
          <a
            v-for="(link, linkIndex) in item.items"
            :key="linkIndex"
            :href="link.link"
            :target="link.newTab ? '_blank' : undefined"
            class="link-text"
          >
            {{ link.text }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-link {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 1rem auto;
  padding: 0 1rem;
  animation: show 0.3s backwards;

  .footer-bar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    .site-title {
      font-weight: bold;
      font-size: 22px;
    }

    .site-desc {
      margin: 0.6rem 0;
      font-weight: bold;
      font-size: 18px;
      color: var(--main-font-second-color);
    }

    .to-home {
      padding: 8px 16px;
      border-radius: 25px;
      margin-top: 8px;
      font-size: 14px;
      color: var(--main-font-color);
      background-color: var(--main-card-second-background);
      border: 1px solid var(--main-card-border);
      transition:
        color 0.3s,
        transform 0.3s,
        border-color 0.3s,
        background-color 0.3s;
      cursor: pointer;

      &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);
        transform: scale(1.1);
        border-color: var(--main-color);
      }
    }
  }

  .footer-social .social-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    contain: layout paint;
    background-color: var(--main-font-color);
    transition:
      transform 0.3s,
      background-color 0.3s;
    color: var(--main-card-background);

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      transform: scale(1.15);
      background-color: var(--main-color);
    }

    &:active {
      transform: scale(1);
    }
  }

  .footer-sitemap {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 1rem 0;

    .sitemap-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 120px;

      .title {
        display: inline-block;
        margin: 1rem 0;
        font-size: 16px;
        font-weight: bold;
        /* margin-left: 8px; */
        color: var(--main-font-second-color);

        &.friends {
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;

          svg {
            font-weight: normal;
            margin-left: 6px;
            color: var(--main-font-second-color);
            transition: color 0.3s;

            &:hover {
              color: var(--main-color);
            }
          }
        }
      }

      .links {
        display: flex;
        flex-direction: column;
        align-items: center;

        .link-text {
          color: var(--main-font-color);
          display: inline-block;
          max-width: 120px;
          width: max-content;
          margin: 4px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow-wrap: break-word;
          padding: 8px;
          border-radius: 12px;
          transition:
            color 0.3s,
            background-color 0.3s;
          cursor: pointer;

          &:hover {
            color: var(--main-color);
            background-color: var(--main-color-bg);
          }
        }
      }
    }
  }
}
</style>
