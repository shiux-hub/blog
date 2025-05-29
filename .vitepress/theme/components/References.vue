<!-- 参考资料 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useData } from '@/composables/data'

const { frontmatter } = useData()

// 参考资料
const references = frontmatter.value?.references
</script>

<template>
  <div v-if="references" class="references card cursor-pointer">
    <div class="title">
      <Icon icon="mingcute:quote-left-fill" />
      <span class="title-text">参考资料</span>
    </div>
    <ul class="list">
      <a
        v-for="(item, index) in references"
        :key="index"
        :href="item.url"
        class="list-item"
        target="_blank"
      >
        <span class="item-title">{{ item.title }}</span>
      </a>
    </ul>
  </div>
</template>

<style scoped>
.references {
  margin: 1rem 0;
  padding: 18px;
  margin-top: 2rem;
  background-color: var(--color-card-second-background);

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--color-font-second-color);
    font-size: 15px;
    margin-bottom: 0.8rem;

    svg {
      margin-right: 4px;
      width: 18px;
      height: 18px;
      color: var(--color-font-second-color);
      opacity: 0.6;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    margin: 0;
    list-style-type: none;
    padding-left: 0.4rem;

    .list-item {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      width: max-content;
      padding-left: 1rem;
      margin-bottom: 0.4rem;
      overflow: auto;
      transition: color 0.3s;

      .item-title {
        padding-bottom: 2px;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 8px;
        height: 8px;
        opacity: 0.6;
        background-color: var(--color-font-color);
        border-radius: 50%;
        transition: background-color 0.3s;
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 0;
        margin-left: 1rem;
        background-color: var(--color-theme);
        transition: width 0.3s;
      }

      &:hover {
        color: var(--color-theme);

        &::before {
          background-color: var(--color-theme);
        }

        &::after {
          width: calc(100% - 1rem);
        }
      }
    }
  }
}
</style>
