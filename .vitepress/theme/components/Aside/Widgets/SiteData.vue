<!-- 侧边栏 - 站点数据 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import dayjs from 'dayjs'
import { useData } from '@/composables/data'
import { loadScript } from '@/utils/commonTools'

const { theme } = useData()

onMounted(() => {
  loadScript(
    'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',
    {
      async: true,
      reload: true,
    },
  )
})
</script>

<template>
  <div class="site-data card">
    <div class="title">
      <Icon icon="mingcute:chart-line-fill" />
      <span class="title-name">站点数据</span>
    </div>
    <div class="all-data">
      <div class="data-item">
        <span class="name">
          <Icon icon="mingcute:paper-2-fill" />
          文章总数
        </span>
        <span class="num">{{ theme.postData?.length || 0 }} 篇</span>
      </div>
      <div class="data-item">
        <span class="name">
          <Icon icon="mingcute:calendar-2-fill" />
          建站天数
        </span>
        <span class="num">{{ dayjs().diff(theme.since, 'day') }} 天</span>
      </div>
      <div class="data-item">
        <span class="name">
          <Icon icon="mingcute:eye-2-fill" />
          总访问量
        </span>
        <span id="busuanzi_value_site_pv" class="num">0</span>
      </div>
      <div class="data-item">
        <span class="name">
          <Icon icon="mingcute:user-follow-fill" />
          总访客数
        </span>
        <span id="busuanzi_value_site_uv" class="num">0</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-data {
  .all-data {
    .data-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.2rem;
      .name {
        display: flex;
        flex-direction: row;
        align-items: center;
        svg {
          margin-right: 8px;
          opacity: 0.6;
          width: 18px;
          height: 18px;
        }
      }
      .num {
        opacity: 0.8;
        font-size: 15px;
      }
      #busuanzi_value_site_pv {
        &::after {
          content: ' 次';
        }
      }
      #busuanzi_value_site_uv {
        &::after {
          content: ' 人';
        }
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>
