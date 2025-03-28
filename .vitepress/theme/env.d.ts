/// <reference types="vite/client" />
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
}
