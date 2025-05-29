<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import { cn } from '@/utils'
import { shufflePost, smoothScrolling } from '@/utils/helper'

const router = useRouter()
const store = mainStore()
const { scrollData } = storeToRefs(store)
const { site, theme, frontmatter, page } = useData()
</script>

<template>
  <header class="animate-show relative z-1000 h-15 w-full overflow-hidden">
    <nav
      class="main-nav"
      :class="[
        scrollData.isScrollDown ? 'down' : 'up',
        { top: scrollData.height === 0 },
      ]"
    >
      <div
        class="relative container grid h-full grid-cols-[minmax(200px,1fr)_auto_minmax(200px,1fr)] items-center justify-between px-6 max-md:flex max-md:py-4"
      >
        <!-- 导航栏左侧 -->
        <div class="flex min-w-50 items-center max-md:min-w-auto">
          <div class="group nav-btn relative mr-1 max-sm:hidden">
            <Icon icon="mingcute:classify-3-fill" />
            <div
              class="absolute left-0 top-12 opacity-0 invisible origin-top-left scale-80 -translate-y-1 card group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 after:absolute after:-top-5 after:w-full after:h-8 after:z-1 hover:border-theme"
            >
              <div
                v-for="(item, index) in theme.navMore"
                :key="index"
                class="more-item"
              >
                <span class="more-name">{{ item.name }}</span>
                <div class="more-list">
                  <a
                    v-for="(link, i) in item.list"
                    :key="i"
                    :href="link.url"
                    class="more-link"
                    target="_blank"
                  >
                    <img class="link-icon" :src="link.icon" :alt="link.name">
                    <span class="link-name">{{ link.name }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            v-tippy
            class="site-name group active:scale-95"
            title="返回博客主页"
            @click="router.go('/')"
          >
            {{ site.title }}
            <div
              class="text-card-background bg-theme absolute inset-0 flex size-full items-center justify-center rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <Icon icon="mingcute:home-4-fill" class="size-5.5" />
            </div>
          </div>
        </div>
        <!-- 导航栏菜单 -->
        <div
          class="nav-center max-md:bg-card-background max-md:border-card-border max-md:absolute max-md:inset-0 max-md:z-100 max-md:border-b"
        >
          <div class="site-menu">
            <div
              v-for="(item, index) in theme.nav"
              :key="index"
              class="menu-item"
            >
              <span class="link-btn"> {{ item.text }}</span>
              <div v-if="item.items" class="link-child">
                <span
                  v-for="({ link, icon, text }, childIndex) in item.items"
                  :key="childIndex"
                  class="link-child-btn"
                  @click="router.go(link)"
                >
                  <Icon
                    v-if="icon"
                    :icon
                    class="contain-layout contain-paint"
                  />
                  {{ text }}
                </span>
              </div>
            </div>
          </div>
          <span
            class="site-title max-md:h-auto max-md:after:hidden"
            @click="smoothScrolling()"
          >
            {{
              (frontmatter.home ? site.description : page.title)
                || site.description
            }}
          </span>
        </div>
        <div class="right-nav min-w-50 gap-2 max-md:min-w-auto">
          <!-- 开往 -->
          <a
            v-tippy
            class="menu-btn nav-btn travellings"
            title="开往-友链接力"
            href="https://www.travellings.cn/go.html"
            target="_blank"
          >
            <Icon icon="mingcute:airplane-fill" />
          </a>
          <!-- 随机文章 -->
          <div
            v-tippy
            class="menu-btn nav-btn"
            title="随机前往一篇文章"
            @click="router.go(shufflePost(theme.postData))"
          >
            <Icon icon="mingcute:shuffle-2-fill" />
          </div>
          <!-- 搜索 -->
          <div
            v-if="theme.search"
            v-tippy
            class="menu-btn nav-btn"
            title="全站搜索"
            @click="store.changeShowStatus('searchShow')"
          >
            <Icon icon="mingcute:search-fill" />
          </div>
          <!-- 中控台 -->
          <div
            id="open-control"
            v-tippy
            class="menu-btn nav-btn pc"
            title="打开中控台"
            @click="store.changeShowStatus('controlShow')"
          >
            <Icon icon="mingcute:dashboard-3-fill" />
          </div>
          <!-- 返回顶部 -->
          <div
            v-tippy
            class="group menu-btn relative flex size-9 shrink-0 cursor-pointer items-center justify-center transition-all duration-300 ease-in-out active:scale-90"
            :class="{
              'm-0 w-0 scale-0 opacity-0': scrollData.height === 0,
              'w-20': scrollData.percentage > 90,
            }"
            title="返回顶部"
            @click="smoothScrolling()"
          >
            <div
              :class="
                cn(
                  'group-hover:bg-theme group-hover:text-card-background bg-font-color absolute flex size-6.25 items-center justify-center rounded-full transition-all duration-300 group-hover:size-9',
                  {
                    'w-17.5 group-hover:w-20': scrollData.percentage > 90,
                  },
                )
              "
            >
              <Icon
                icon="mingcute:arrow-up-fill"
                class="absolute opacity-0 group-hover:opacity-100"
              />
              <span
                class="text-card-background text-xs transition-all duration-300 group-hover:opacity-0"
              >
                {{
                  scrollData.percentage > 90
                    ? '返回顶部'
                    : scrollData.percentage
                }}
              </span>
            </div>
          </div>

          <!-- 移动端菜单 -->
          <div
            v-tippy
            class="menu-btn nav-btn mobile"
            title="打开菜单"
            @click="store.changeShowStatus('mobileMenuShow')"
          >
            <Icon icon="mingcute:menu-fill" />
          </div>
        </div>
      </div>
    </nav>
    <!-- 移动端菜单 -->
    <MobileMenu />
    <!-- 全局搜索 -->
    <NavbarSearch v-if="theme.search" />
  </header>
</template>

<style scoped>
@layer base {
  .more-item {
    margin-top: 0.8rem;

    &:first-child {
      margin-top: 0;
    }

    .more-name {
      font-size: 14px;
      display: inline-block;
      color: var(--color-font-second-color);
      margin-bottom: 0.6rem;
    }

    .more-list {
      display: grid;
      gap: 0.8rem;
      grid-template-columns: 1fr 1fr;

      .more-link {
        display: flex;
        align-items: center;
        width: 150px;
        padding: 6px 8px;
        border-radius: 8px;
        cursor: pointer;

        .link-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 8px;
        }

        &:hover {
          color: var(--color-card-background);
          background-color: var(--color-theme);
        }
      }
    }
  }

  .site-name {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    height: 34px;
    padding: 0 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: transform 0.3s;
    cursor: pointer;
  }

  .nav-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    height: 60px;
    overflow: hidden;
    transition: top 0.3s;

    .site-menu {
      position: absolute;
      width: fit-content;
      min-height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      z-index: 10;
      opacity: 0;
      transform: translateY(-50px);
      scale: 1.1;
      transition:
        transform 0.3s,
        scale 0.3s,
        opacity 0.3s;

      .menu-item {
        position: relative;
        padding: 0 0.4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;

        .link-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.2rem;
          padding: 0 0.8rem 0 1rem;
          font-weight: bold;
          height: 35px;
          line-height: 35px;
          border-radius: 50px;
          transition:
            color 0.3s,
            background-color 0.3s;
        }

        .link-child {
          position: absolute;
          top: 35px;
          margin-top: 8px;
          padding: 6px 2px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background-color: var(--color-card-background);
          border: 1px solid var(--color-theme);
          box-shadow: 0 8px 12px -3px var(--color-theme-op);
          border-radius: 50px;
          transform: translateY(-10px) scale(0.8);
          opacity: 0;
          visibility: hidden;
          transition:
            opacity 0.3s,
            visibility 0.3s,
            transform 0.3s;

          &::before {
            content: '';
            position: absolute;
            top: -14px;
            left: 0;
            width: 100%;
            height: 20px;
          }

          .link-child-btn {
            display: flex;
            align-items: center;
            border-radius: 100px;
            margin: 0 4px;
            padding: 0.6rem 0.8rem;
            white-space: nowrap;
            cursor: pointer;
            transition:
              color 0.3s,
              padding 0.3s,
              background-color 0.3s,
              box-shadow 0.3s;

            svg {
              margin-right: 8px;
              width: 1.25rem;
              height: 1.25rem;
            }

            &:hover {
              color: var(--color-card-background);
              background-color: var(--color-theme);
              box-shadow: 0 8px 12px -3px var(--color-theme-op);
              padding: 0.6rem 1rem;
            }
          }
        }

        &:first-child {
          .link-child {
            &::after {
              content: '';
              position: absolute;
              top: -60px;
              left: 0;
              width: 50%;
              height: 60px;
            }
          }
        }

        &:last-child {
          .link-child {
            &::after {
              content: '';
              position: absolute;
              top: -60px;
              right: 0;
              width: 50%;
              height: 60px;
            }
          }
        }

        &:hover {
          .link-btn {
            color: var(--color-card-background);
            background-color: var(--color-theme);
          }

          .link-child {
            transform: translateY(0) scale(1);
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }

    .site-title {
      position: relative;
      display: inline-block;
      width: 100%;
      min-width: 280px;
      height: 35px;
      font-weight: bold;
      font-size: 18px;
      padding: 4px 8px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      scale: 1;
      transition:
        transform 0.3s,
        scale 0.3s,
        opacity 0.3s;
      cursor: pointer;

      &::after {
        content: '返回顶部';
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 35px;
        font-size: 16px;
        border-radius: 50px;
        color: var(--color-card-background);
        background-color: var(--color-theme);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1;
      }

      &:hover {
        &::after {
          opacity: 1;
        }
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }

  .right-nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    min-width: 200px;

    .menu-btn {
      &.mobile {
        display: none;
        border-radius: 8px;
      }

      @media (max-width: 768px) {
        &.mobile {
          display: flex;
        }

        &.pc {
          display: none;
        }
      }
    }
  }

  .main-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 60px;
    background-color: var(--color-card-background);
    transition:
      background-color 0.3s,
      backdrop-filter 0.3s;

    &::after {
      content: '';
      position: absolute;
      height: 1px;
      width: 100%;
      left: 0;
      bottom: 0;
      background-color: var(--color-card-border);
      transition: opacity 0.3s;
    }

    &.top {
      background-color: transparent;
      outline: 0px;

      &::after {
        opacity: 0;
      }
    }

    &.top,
    &.up {
      .site-menu {
        transform: translateY(0);
        scale: 1;
        opacity: 1;
      }

      .site-title {
        transform: translateY(50px);
        scale: 1.1;
        opacity: 0;
      }

      @media (max-width: 768px) {
        .nav-center {
          top: -80px;
        }
      }
    }
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 0;
    transition: background-color 0.3s;
    border-radius: 50%;

    svg {
      width: 1.25rem;
      height: 1.25rem;
      line-height: 1;
      transition:
        color 0.3s,
        opacity 0.3s;
    }

    &:hover {
      background-color: var(--color-theme);

      svg {
        color: var(--color-card-background);
      }
    }
  }
}
</style>
