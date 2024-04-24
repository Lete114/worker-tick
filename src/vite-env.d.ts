/// <reference types="vite/client" />

declare interface TWorkerTick {
  id?: number
  uuid: string
  action: 'setTimeout' | 'setInterval' | 'clearInterval' | 'clearTimeout'
  timer?: number
  timeout?: number
  args?: any[]
}
