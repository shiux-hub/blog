export interface SiteInfo {
  iconUrl: string | null
  title: string | null
  description: string | null
}

export interface Message {
  info: (text: string, options?: any, func?: any) => void
  success: (text: string, options?: any, func?: any) => void
  warning: (text: string, options?: any, func?: any) => void
  error: (text: string, options?: any, func?: any) => void
}
