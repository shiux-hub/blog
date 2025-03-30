import { existsSync } from 'node:fs'
import path from 'node:path'
import { themeConfig } from './theme/assets/themeConfig'

/**
 * 获取并合并配置文件
 */
export async function getThemeConfig() {
  try {
    // 配置文件绝对路径
    const configPath = path.resolve(__dirname, '../themeConfig.ts')

    if (existsSync(configPath)) {
      // 文件存在时进行动态导入
      const userConfig = await import('../themeConfig.ts')

      return Object.assign(themeConfig, userConfig.themeConfig || {})
    }
    else {
      // 文件不存在时返回默认配置
      console.warn('User configuration file not found, using default themeConfig.')
      return themeConfig
    }
  }
  catch (error) {
    console.error('An error occurred while loading the configuration:', error)
    return themeConfig
  }
}
