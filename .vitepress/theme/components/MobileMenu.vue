<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useData } from '@/composables/data'
import { mainStore } from '@/store'

const store = mainStore()
const router = useRouter()
const { theme } = useData()

// 页面跳转
function pageJump(url: string) {
  if (!url)
    return false
  store.changeShowStatus('mobileMenuShow')
  router.go(url)
}
</script>

<template>
  <Teleport to="body">
    <!-- 移动端菜单 -->
    <Transition name="fade" mode="out-in">
      <div
        v-show="store.mobileMenuShow"
        class="fixed inset-0 z-3000 h-dvh w-dvw"
      >
        <!-- 背景遮罩 -->
        <div
          class="bg-mask-background-deep absolute inset-0 -z-1 size-full"
          @click="store.changeShowStatus('mobileMenuShow')"
        />
        <Transition name="toLeft" mode="out-in">
          <div
            v-show="store.mobileMenuShow"
            class="card bg-mask-background-deep absolute top-0 right-0 size-full max-w-75 space-y-2 overflow-auto rounded-none p-5"
          >
            <!-- 站点数据 -->
            <div class="flex items-center gap-3">
              <img
                class="h-10 w-10 rounded-full"
                :src="theme.siteMeta.logo"
                :alt="theme.siteMeta.title"
              >
              <div class="flex-1 space-x-1">
                <span class="text-lg font-bold">{{
                  theme.siteMeta.title
                }}</span>
                <span class="text-font-second-color text-sm">{{
                  theme.siteMeta.description
                }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Icon class="text-lg" icon="mdi:email-outline" />
              <span class="text-font-second-color text-sm">{{
                theme.siteMeta.author.email
              }}</span>
            </div>
            <div class="flex items-center gap-4 py-3">
              <div>
                <div class="text-font-second-color text-xs">
                  文章
                </div>
                <div class="truncate text-xl font-bold">
                  {{ theme.postData.length }}
                </div>
              </div>
              <div>
                <div class="text-font-second-color text-xs">
                  分类
                </div>
                <div class="truncate text-xl font-bold">
                  {{
                    Object.values(theme.categoriesData).reduce(
                      (sum, item) => sum + item.count,
                      0,
                    )
                  }}
                </div>
              </div>
              <div>
                <div class="text-font-second-color text-xs">
                  标签
                </div>
                <div class="truncate text-xl font-bold">
                  {{
                    Object.values(theme.tagsData).reduce(
                      (sum, item) => sum + item.count,
                      0,
                    )
                  }}
                </div>
              </div>
            </div>
            <!-- 功能 -->
            <div class="space-y-2">
              <span class="text-font-second-color inline-block text-xs">功能</span>
              <div
                class="hover:bg-theme bg-card-background border-card-border shadow-xm shadow-border-shadow flex cursor-pointer items-center rounded-lg border px-3 py-2 text-sm transition-colors duration-300 hover:text-white"
                @click.stop="store.changeThemeType"
              >
                <Icon
                  class="mr-1.5 opacity-60"
                  :icon="
                    store.themeType === 'auto'
                      ? 'mingcute:history-anticlockwise-fill'
                      : store.themeType === 'dark'
                        ? 'mingcute:moon-fill'
                        : 'mingcute:sun-fill'
                  "
                />
                <span class="max-w-20 truncate">切换主题</span>
              </div>
            </div>
            <!-- 菜单 -->
            <div
              v-for="(item, index) in theme.nav"
              :key="index"
              class="space-y-2"
            >
              <span class="text-font-second-color inline-block text-xs">
                {{ item.text }}</span>
              <div v-if="item.items" class="grid grid-cols-2 gap-2">
                <div
                  v-for="{ link, icon, text } in item.items"
                  :key="text"
                  class="bg-card-background border-card-border flex cursor-pointer items-center rounded-lg border px-3 py-2.5"
                  @click="pageJump(link)"
                >
                  <Icon v-if="icon" class="mr-1.5 opacity-60" :icon />
                  <span class="max-w-20 truncate">{{ text }}</span>
                </div>
              </div>
            </div>
            <!-- 标签 -->
            <div class="space-y-2">
              <span class="text-font-second-color inline-block text-xs">标签</span>
              <div class="flex flex-wrap gap-1 text-sm">
                <div
                  v-for="(item, tag) in theme.tagsData"
                  :key="tag"
                  class="border-card-border bg-card-background cursor-pointer space-x-1 rounded-lg border px-2 py-0.5 transition-colors duration-300"
                  @click="pageJump(`/pages/tags/${tag}`)"
                >
                  <span class="max-w-20 truncate">{{ tag }}</span>
                  <sup class="opacity-40">{{ item.count }}</sup>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
