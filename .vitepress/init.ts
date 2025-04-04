import { existsSync } from 'node:fs'
import path from 'node:path'
import { themeConfig } from './theme/assets/themeConfig'

/**
 * 获取并合并配置文件
 */
export async function getThemeConfig() {
  try {
    const configPath = path.resolve(__dirname, '../themeConfig.ts')

    if (existsSync(configPath)) {
      const userConfig = await import('../themeConfig')
      // 使用展开运算符合并配置，用户配置优先
      return {
        ...themeConfig,
        ...(userConfig.themeConfig || {}),
        // 特殊处理需要深度合并的对象
        siteMeta: {
          ...themeConfig.siteMeta,
          ...(userConfig.themeConfig?.siteMeta || {}),
        },
        footer: {
          ...themeConfig.footer,
          ...(userConfig.themeConfig?.footer || {}),
        },
      }
    }
  }
  catch (error) {
    console.error('An error occurred while loading the configuration:', error)
    return themeConfig
  }
}
