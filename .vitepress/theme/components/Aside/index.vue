<script lang="ts" setup>
withDefaults(defineProps<{
  showToc?: boolean
}>(), {
  showToc: false,
})
const { theme } = useData()
</script>

<template>
  <aside class="main-aside">
    <Hello v-if="theme.aside.hello.enable" class="weidgets" />
    <div class="sticky">
      <Toc v-if="theme.aside.toc.enable && showToc" class="weidgets" />
      <Countdown class="weidgets" />
      <Tags v-if="theme.aside.tags.enable" class="weidgets" />
      <SiteData v-if="theme.aside.siteData.enable" class="weidgets" />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.main-aside {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  animation: fade-up 0.6s 0.3s backwards;
  .weidgets {
    padding: 18px;
    margin-bottom: 1rem;
    :deep(.title) {
      margin-bottom: 12px;
      font-weight: bold;
      display: flex;
      align-items: center;
      opacity: 0.75;
      .iconfont {
        opacity: 0.6;
        margin-right: 6px;
      }
      .title-name {
        opacity: 0.8;
      }
    }
  }
  .sticky {
    position: sticky;
    top: calc(60px + 1rem);
    .weidgets {
      animation: fade-up 0.6s 0.4s backwards;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
