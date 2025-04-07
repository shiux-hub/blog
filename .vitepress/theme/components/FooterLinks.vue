<!-- 页脚 - 链接 -->
<script lang="ts" setup>
import { useData } from '@/composables/data'
import { smoothScrolling } from '@/utils/helper'
import { Icon } from '@iconify/vue'
import { isObject } from 'radashi'

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
const { sitemap, socialLinks, siteMeta } = theme.value
// 社交链接数据
const socialLinkData = computed(() => {
  const halfLength = Math.ceil((socialLinks?.length ?? 0) / 2)
  const firstHalf = socialLinks?.slice(0, halfLength)
  const secondHalf = socialLinks?.slice(halfLength)
  return { first: firstHalf, second: secondHalf }
})
</script>

<template>
  <div
    class="animate-show container mx-auto flex w-full flex-wrap justify-between gap-8 px-6"
  >
    <div v-if="showBar" class="flex w-full flex-col items-center gap-2">
      <span class="text-xl font-bold">{{ site.title }}</span>
      <span class="text-font-second-color font-bold">{{
        site.description
      }}</span>
      <a
        href="/"
        class="border-card-border bg-card-second-background hover:text-card-background hover:bg-theme hover:border-theme mt-2 cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-300 hover:scale-110"
      >了解更多</a>
    </div>
    <div
      class="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-13"
    >
      <a
        v-for="({ link, icon, ariaLabel }, index) in socialLinkData.first"
        :key="index"
        v-tippy="ariaLabel"
        :href="link"
        :aria-label
        target="_blank"
        class="bg-font-color text-card-background hover:bg-theme flex size-8 items-center justify-center rounded-full transition-[scale,background-color] duration-300 contain-layout hover:scale-115 active:scale-100"
      >
        <component
          :is="isObject(icon) ? 'div' : Icon"
          class="size-5"
          v-bind="isObject(icon) ? { innerHTML: icon.svg } : { icon }"
        />
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
        v-for="({ link, icon, ariaLabel }, index) in socialLinkData.second"
        :key="index"
        v-tippy="ariaLabel"
        :href="link"
        :aria-label
        target="_blank"
        class="bg-font-color text-card-background hover:bg-theme flex size-8 items-center justify-center rounded-full transition-[scale,background-color] duration-300 contain-layout hover:scale-115 active:scale-100"
      >
        <component
          :is="isObject(icon) ? 'div' : Icon"
          class="size-5"
          v-bind="isObject(icon) ? { innerHTML: icon.svg } : { icon }"
        />
      </a>
    </div>
    <div class="flex w-full flex-wrap justify-between">
      <div
        v-for="(item, index) in sitemap"
        :key="index"
        class="flex flex-col gap-4"
      >
        <span class="text-font-second-color ml-2 font-bold">{{
          item.text
        }}</span>
        <div class="flex flex-col gap-4">
          <a
            v-for="(link, linkIndex) in item.items"
            :key="linkIndex"
            :href="link.link"
            :target="link.newTab ? '_blank' : undefined"
            class="hover:text-theme hover:bg-theme-op w-max max-w-30 cursor-pointer truncate rounded-xl p-2 transition-colors duration-300"
          >
            {{ link.text }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
