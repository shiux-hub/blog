import type { ThemeConfig } from '@/types/theme'
import { useData as useData$ } from 'vitepress'

export const useData: typeof useData$<ThemeConfig> = useData$
