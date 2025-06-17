import type { ThemeData } from '@/types/theme'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { withPwa } from '@vite-pwa/vitepress'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vitepress'
import { getThemeConfig } from './init'
import { jumpRedirect } from './theme/utils/commonTools'
import { createRssFile } from './theme/utils/generateRSS'
import {
  getAllArchives,
  getAllCategories,
  getAllPosts,
  getAllType,
} from './theme/utils/getPostData'
import markdownConfig from './theme/utils/markdownConfig'

// 获取全局数据
// eslint-disable-next-line antfu/no-top-level-await
const postData = await getAllPosts()

// 获取主题配置
// eslint-disable-next-line antfu/no-top-level-await
const themeConfig = await getThemeConfig()

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig<ThemeData>({
    title: themeConfig.siteMeta.title,
    description: themeConfig.siteMeta.description,
    lang: themeConfig.siteMeta.lang,
    // 简洁的 URL
    cleanUrls: true,
    // 最后更新时间戳
    lastUpdated: true,
    // 主题
    appearance: 'dark',
    // Head
    head: themeConfig.inject.header,
    // sitemap
    sitemap: {
      hostname: themeConfig.siteMeta.site,
    },
    // 主题配置
    themeConfig: {
      ...themeConfig,
      // 必要数据
      postData,
      tagsData: getAllType(postData),
      categoriesData: getAllCategories(postData),
      archivesData: getAllArchives(postData),
    },
    // markdown
    markdown: {
      math: true,
      lineNumbers: true,
      toc: { level: [1, 2, 3] },
      image: {
        lazyLoading: true,
      },
      config: md => markdownConfig(md, themeConfig),
    },
    // 构建排除
    srcExclude: ['**/README.md', '**/TODO.md'],
    // transformHead
    transformPageData: async (pageData) => {
      // canonical URL
      const canonicalUrl
        = `${themeConfig.siteMeta.site}/${pageData.relativePath}`
          .replace(/index\.md$/, '')
          .replace(/\.md$/, '')
      pageData.frontmatter.head ??= []
      pageData.frontmatter.head.push([
        'link',
        { rel: 'canonical', href: canonicalUrl },
      ])
    },
    // transformHtml
    transformHtml: (html) => {
      return jumpRedirect(html, themeConfig)
    },
    // buildEnd
    buildEnd: async (config) => {
      await createRssFile(config, themeConfig)
    },
    // vite
    vite: {
      plugins: [
        tailwindcss() as any,
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
        vueDevTools(),
      ],
      resolve: {
        // 配置路径别名
        alias: {
          '@': path.resolve(__dirname, './theme'),
        },
      },
      // 服务器
      server: {
        port: 9877,
      },
      // 构建
      build: {
        minify: 'terser',
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'],
          },
        },
      },
    },
    // PWA
    pwa: {
      registerType: 'autoUpdate',
      selfDestroying: true,
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        // 资源缓存
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(woff2|woff|ttf|css)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'file-cache',
            },
          },
          {
            urlPattern:
              /(.*?)\.(ico|webp|png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
            },
          },
        ],
        // 缓存文件
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,gif,svg,woff2,ttf}'],
        // 排除路径
        navigateFallbackDenylist: [
          /^\/sitemap.xml$/,
          /^\/rss.xml$/,
          /^\/robots.txt$/,
        ],
      },
      manifest: {
        name: themeConfig.siteMeta.title,
        short_name: themeConfig.siteMeta.title,
        description: themeConfig.siteMeta.description,
        display: 'standalone',
        start_url: '/',
        theme_color: '#fff',
        background_color: '#efefef',
        icons: [
          {
            src: '/images/logo/favicon-32x32.webp',
            sizes: '32x32',
            type: 'image/webp',
          },
          {
            src: '/images/logo/favicon-96x96.webp',
            sizes: '96x96',
            type: 'image/webp',
          },
          {
            src: '/images/logo/favicon-256x256.webp',
            sizes: '256x256',
            type: 'image/webp',
          },
          {
            src: '/images/logo/favicon-512x512.webp',
            sizes: '512x512',
            type: 'image/webp',
          },
        ],
      },
    },
  }),
)
