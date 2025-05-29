<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import Banner from '@/components/Banner.vue'
</script>

<template>
  <Banner
    v-tippy
    type="page"
    title="我的项目"
    desc="源于热爱开发优秀的作品"
    footer="写 BUG 小能手"
    image="https://www.dmoe.cc/random.php"
  >
    <template #footer-slot>
      <a class="to-github" href="https://github.com/imsyy/" target="_blank">
        <Icon icon="ri:github-line" />
        <span>前往 GitHub</span>
      </a>
    </template>
  </Banner>
</template>

<style scoped>
.to-github {
  height: 40px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  color: #fff;
  background-color: var(--color-dark-opacity);
  backdrop-filter: blur(20px);
  transition:
    color 0.3s,
    background-color 0.3s;

  svg {
    margin-right: 8px;
    transition: color 0.3s;
  }

  &:hover {
    color: var(--color-card-background);
    background-color: var(--color-theme);
  }
}
</style>
