---
title: 标签
aside: false
padding: false
---

<script lang="ts" setup>
import { onMounted } from "vue"
import { useData } from "@/composables/data"
import Home from "@/views/Home.vue"

const { params, site } = useData()

onMounted(() => {
  document.title = `标签：${params.value.name} | ${site.value.title}`
})
</script>

<Home :showHeader="false" :tag="params.name" />
