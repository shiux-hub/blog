---
aside: false
padding: false
---

<script lang="ts" setup>
import { onMounted } from "vue";
import { useData } from "vitepress"
import Home from "@/views/Home.vue"

const { params } = useData();
</script>

<Home :showHeader="false" :page="Number(params.num)" />
