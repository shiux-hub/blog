import type { ViteUserConfig } from 'vitest/config'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vitest/config'

const config: ViteUserConfig = {
  plugins: [
    tailwindcss(),
    autoImport({
      imports: ['vue', 'vitepress'],
      dts: '.vitepress/auto-imports.d.ts',
    }),
    components({
      dirs: ['.vitepress/theme/components', '.vitepress/theme/views'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: '.vitepress/components.d.ts',
    }),
    vue(),
    vueDevTools(),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './.vitepress/theme'),
    },
  },
  test: {
    environment: 'happy-dom',
  },
}

export default defineConfig(config)
