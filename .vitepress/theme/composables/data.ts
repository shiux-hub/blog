import type { ThemeData } from '@/types/theme'
import { useData as useData$ } from 'vitepress'

export const useData: typeof useData$<ThemeData> = useData$
