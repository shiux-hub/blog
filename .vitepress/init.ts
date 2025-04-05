import type { ThemeConfig } from '@/types/theme'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { isArray, isObject } from 'radashi'
import { themeConfig } from './theme/assets/themeConfig'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}

/**
 * 获取并合并配置文件
 */
export async function getThemeConfig(): Promise<ThemeConfig> {
  try {
    const configPath = fileURLToPath(new URL('../themeConfig.ts', import.meta.url))

    if (existsSync(configPath)) {
      const userConfig = await import('../themeConfig')

      // 修改后的深度合并函数（数组直接替换）
      function deepMerge<T>(a: T, b: DeepPartial<T>): T {
        const merged = { ...a }

        for (const key in b) {
          const value = b[key]

          // 跳过null或undefined的值
          if (value == null) {
            continue
          }

          const existing = merged[key]

          // 处理数组（直接替换而不是合并）
          if (isArray(value)) {
            merged[key] = [...value] as any
            continue
          }

          // 处理对象
          if (isObject(existing) && isObject(value)
            && !isArray(existing)) {
            // 递归合并
            merged[key] = deepMerge(existing, value)
            continue
          }

          // 基本类型直接赋值
          merged[key] = value as T[Extract<keyof T, string>]
        }

        return merged
      }

      return deepMerge(themeConfig, userConfig.themeConfig || {})
    }

    return themeConfig
  }
  catch (error) {
    console.error('An error occurred while loading the configuration:', error)
    return themeConfig
  }
}
