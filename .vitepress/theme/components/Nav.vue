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
        { top: scrollData.percentage === 0 },
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
              class="card hover:border-theme invisible absolute top-12 left-0 origin-top-left -translate-y-1 scale-80 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 after:absolute after:-top-5 after:z-1 after:h-8 after:w-full"
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
            v-tippy="'返回博客主页'"
            class="site-name group active:scale-95"
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
            class="site-title max-md:h-auto max-md:text-sm max-md:after:hidden"
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
            v-tippy="'开往-友链接力'"
            class="menu-btn nav-btn travellings"
            href="https://www.travellings.cn/go.html"
            target="_blank"
          >
            <Icon icon="mingcute:airplane-fill" />
          </a>
          <!-- 随机文章 -->
          <div
            v-tippy="'随机前往一篇文章'"
            class="menu-btn nav-btn"
            @click="router.go(shufflePost(theme.postData))"
          >
            <Icon icon="mingcute:shuffle-2-fill" />
          </div>
          <!-- 搜索 -->
          <div
            v-if="theme.search"
            v-tippy="'全站搜索'"
            class="menu-btn nav-btn"
            @click="store.changeShowStatus('searchShow')"
          >
            <Icon icon="mingcute:search-fill" />
          </div>
          <!-- 中控台 -->
          <div
            id="open-control"
            v-tippy="'打开中控台'"
            class="menu-btn nav-btn pc"
            @click="store.changeShowStatus('controlShow')"
          >
            <Icon icon="mingcute:dashboard-3-fill" />
          </div>
          <!-- 返回顶部 -->
          <div
            v-tippy="'返回顶部'"
            class="group menu-btn relative flex size-9 shrink-0 cursor-pointer items-center justify-center transition-all duration-300 ease-in-out active:scale-90"
            :class="{
              'm-0 w-0 scale-0 opacity-0': scrollData.percentage === 0,
              'w-20': scrollData.percentage > 90,
            }"
            @click="smoothScrolling()"
          >
            <div
              :class="
                cn(
                  'group-hover:bg-theme group-hover:text-card-background bg-font-color absolute flex size-6.25 items-center justify-center overflow-hidden rounded-full transition-all duration-300 group-hover:size-9',
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
                class="text-card-background text-xs text-nowrap group-hover:opacity-0"
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
            v-tippy="'打开菜单'"
            class="menu-btn nav-btn mobile"
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
    margin-block-start: 0.8rem;

    .more-name {
      display: inline-block;
      margin-block-end: 0.6rem;
      font-size: 14px;
      color: var(--color-font-second-color);
    }

    .more-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.8rem;

      .more-link {
        display: flex;
        align-items: center;
        inline-size: 150px;
        padding: 6px 8px;
        cursor: pointer;
        border-radius: 8px;

        .link-icon {
          inline-size: 24px;
          block-size: 24px;
          margin-inline-end: 8px;
          border-radius: 50%;
        }

        &:hover {
          color: var(--color-card-background);
          background-color: var(--color-theme);
        }
      }
    }

    &:first-child {
      margin-block-start: 0;
    }
  }

  .site-name {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    block-size: 34px;
    padding: 0 6px;
    overflow: hidden;
    font-size: 18px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .nav-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    block-size: 60px;
    overflow: hidden;
    transition: inset-block-start 0.3s;

    .site-menu {
      position: absolute;
      z-index: 10;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      inline-size: fit-content;
      min-block-size: 60px;
      opacity: 0%;
      transition:
        transform 0.3s,
        scale 0.3s,
        opacity 0.3s;
      transform: translateY(-50px);
      scale: 1.1;

      .menu-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 0.4rem;
        margin: auto;

        .link-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          block-size: 35px;
          padding: 0 0.8rem 0 1rem;
          font-weight: bold;
          line-height: 35px;
          letter-spacing: 0.2rem;
          border-radius: 50px;
          transition:
            color 0.3s,
            background-color 0.3s;
        }

        .link-child {
          position: absolute;
          inset-block-start: 35px;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 2px;
          margin-block-start: 8px;
          visibility: hidden;
          background-color: var(--color-card-background);
          border: 1px solid var(--color-theme);
          border-radius: 50px;
          box-shadow: 0 8px 12px -3px var(--color-theme-op);
          opacity: 0%;
          transition:
            opacity 0.3s,
            visibility 0.3s,
            transform 0.3s;
          transform: translateY(-10px) scale(0.8);

          .link-child-btn {
            display: flex;
            align-items: center;
            padding: 0.6rem 0.8rem;
            margin: 0 4px;
            white-space: nowrap;
            cursor: pointer;
            border-radius: 100px;
            transition:
              color 0.3s,
              padding 0.3s,
              background-color 0.3s,
              box-shadow 0.3s;

            svg {
              inline-size: 1.25rem;
              block-size: 1.25rem;
              margin-inline-end: 8px;
            }

            &:hover {
              padding: 0.6rem 1rem;
              color: var(--color-card-background);
              background-color: var(--color-theme);
              box-shadow: 0 8px 12px -3px var(--color-theme-op);
            }
          }

          &::before {
            position: absolute;
            inset-block-start: -14px;
            inset-inline-start: 0;
            inline-size: 100%;
            block-size: 20px;
            content: '';
          }
        }

        &:first-child {
          .link-child {
            &::after {
              position: absolute;
              inset-block-start: -60px;
              inset-inline-start: 0;
              inline-size: 50%;
              block-size: 60px;
              content: '';
            }
          }
        }

        &:last-child {
          .link-child {
            &::after {
              position: absolute;
              inset-block-start: -60px;
              inset-inline-end: 0;
              inline-size: 50%;
              block-size: 60px;
              content: '';
            }
          }
        }

        &:hover {
          .link-btn {
            color: var(--color-card-background);
            background-color: var(--color-theme);
          }

          .link-child {
            visibility: visible;
            opacity: 100%;
            transform: translateY(0) scale(1);
          }
        }
      }
    }

    .site-title {
      position: relative;
      display: inline-block;
      inline-size: 100%;
      min-inline-size: 280px;
      block-size: 35px;
      padding: 4px 8px;
      overflow: hidden;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      transition:
        transform 0.3s,
        scale 0.3s,
        opacity 0.3s;
      scale: 1;

      &:hover {
        &::after {
          opacity: 100%;
        }
      }

      &:active {
        transform: scale(0.95);
      }

      &::after {
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        inline-size: 100%;
        block-size: 35px;
        font-size: 16px;
        color: var(--color-card-background);
        content: '返回顶部';
        background-color: var(--color-theme);
        border-radius: 50px;
        opacity: 0%;
        transition: opacity 0.3s;
      }
    }
  }

  .right-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    min-inline-size: 200px;

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
    position: fixed;
    inset-block-start: 0;
    inset-inline-start: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    inline-size: 100vi;
    block-size: 60px;
    background-color: var(--color-card-background);
    transition:
      background-color 0.3s,
      backdrop-filter 0.3s;

    &.top {
      background-color: transparent;
      outline: 0;

      &::after {
        opacity: 0%;
      }
    }

    &.top,
    &.up {
      .site-menu {
        opacity: 100%;
        transform: translateY(0);
        scale: 1;
      }

      .site-title {
        opacity: 0%;
        transform: translateY(50px);
        scale: 1.1;
      }

      @media (max-width: 768px) {
        .nav-center {
          inset-block-start: -80px;
        }
      }
    }

    &::after {
      position: absolute;
      inset-block-end: 0;
      inset-inline-start: 0;
      inline-size: 100%;
      block-size: 1px;
      content: '';
      background-color: var(--color-card-border);
      transition: opacity 0.3s;
    }
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 35px;
    block-size: 35px;
    padding: 0;
    border-radius: 50%;
    transition: background-color 0.3s;

    svg {
      inline-size: 1.25rem;
      block-size: 1.25rem;
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
