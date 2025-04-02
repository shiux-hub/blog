/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
import type { Message } from './types/site'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare global {
  interface Window {
    $message: Message
  }
  declare function setTimeout(
    handler: TimerHandler,
    timeout?: number,
    ...arguments: any[]
  ): number
  declare function clearTimeout(handle?: number): void
  declare function setInterval(
    handler: TimerHandler,
    timeout?: number,
    ...arguments: any[]
  ): number
  declare function clearInterval(handle?: number): void
}
