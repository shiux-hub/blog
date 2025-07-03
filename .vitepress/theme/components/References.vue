<!-- 参考资料 -->
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useData } from '@/composables/data'

const { frontmatter } = useData()
</script>

<template>
  <div class="references card cursor-pointer">
    <div class="title">
      <Icon icon="mingcute:quote-left-fill" />
      <span class="title-text">参考资料</span>
    </div>
    <ul class="list">
      <a
        v-for="(item, index) in frontmatter.references"
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
  padding: 18px;
  margin: 1rem 0;
  margin-block-start: 2rem;
  background-color: var(--color-card-second-background);

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-block-end: 0.8rem;
    font-size: 15px;
    color: var(--color-font-second-color);

    svg {
      inline-size: 18px;
      block-size: 18px;
      margin-inline-end: 4px;
      color: var(--color-font-second-color);
      opacity: 60%;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    padding-inline-start: 0.4rem;
    margin: 0;
    list-style-type: none;

    .list-item {
      position: relative;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      inline-size: max-content;
      padding-inline-start: 1rem;
      margin-block-end: 0.4rem;
      overflow: auto;
      transition: color 0.3s;

      .item-title {
        padding-block-end: 2px;
      }

      &:last-child {
        margin-block-end: 0;
      }

      &:hover {
        color: var(--color-theme);

        &::before {
          background-color: var(--color-theme);
        }

        &::after {
          inline-size: calc(100% - 1rem);
        }
      }

      &::before {
        position: absolute;
        inset-inline-start: 0;
        inline-size: 8px;
        block-size: 8px;
        content: '';
        background-color: var(--color-font-color);
        border-radius: 50%;
        opacity: 60%;
        transition: background-color 0.3s;
      }

      &::after {
        position: absolute;
        inset-block-end: 0;
        inset-inline-start: 0;
        inline-size: 0;
        block-size: 2px;
        margin-inline-start: 1rem;
        content: '';
        background-color: var(--color-theme);
        transition: inline-size 0.3s;
      }
    }
  }
}
</style>
