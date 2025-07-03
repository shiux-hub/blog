<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="title">
        404
      </h1>
      <span class="title-tip">Page not found</span>
      <button class="to-home" @click="router.go('/')">
        回到主页
      </button>
    </div>
  </div>
</template>

<style scoped>
.not-found-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;
  animation: fade-up 0.6s 0.1s backwards;

  .title {
    margin: 2rem 0;
    font-size: 8rem;
    line-height: 1;
  }

  .title-tip {
    font-size: 2rem;
    opacity: 60%;
  }

  .to-home {
    padding: 12px 26px;
    margin-block-start: 2rem;
    font-size: 20px;
    color: var(--color-font-color);
    cursor: pointer;
    background-color: var(--color-card-border);
    border: none;
    border-radius: 12px;
    outline: none;
    transition:
      color 0.3s,
      background-color 0.3s;

    &:hover {
      color: var(--color-card-background);
      background-color: var(--color-theme);
    }
  }
}
</style>
