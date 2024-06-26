import { workerCode } from './worker'
import { getUUID } from './utils'

const SETTIMEOUT = 'setTimeout' as const
const CLEARTIMEOUT = 'clearTimeout' as const
const SETINTERVAL = 'setInterval' as const
const CLEARINTERVAL = 'clearInterval' as const

type TTimer = typeof SETTIMEOUT | typeof SETINTERVAL
type TClearTimer = typeof CLEARTIMEOUT | typeof CLEARINTERVAL

const code = `(${workerCode})()`
const blob = new Blob([code], { type: 'application/javascript' })
const url = URL.createObjectURL(blob)

const worker = new Worker(url)

const map = new Map<string, { id?: number, handler: Function, args: any[] }>()

worker.addEventListener('message', (event: MessageEvent<{ id: number, uuid: string, finish: boolean }>) => {
  const { id, uuid, finish } = event.data
  const data = map.get(uuid)

  if (id && uuid && data) {
    data.id = id
    map.set(uuid, data)
  }
  if (finish && data) {
    const { handler, args } = data
    handler(...args)
  }
})

function setTimer(action: TTimer, handler: Function, timeout?: number, ...args: any[]) {
  const uuid = getUUID().replace(/-/g, '')
  map.set(uuid, { handler, args })
  const params: TWorkerTick = {
    uuid,
    args,
    action,
    timeout,
  }

  worker.postMessage(params)
  return uuid
}

function clear(uuid: string, action: TClearTimer) {
  const { id } = map.get(uuid)!
  worker.postMessage({ id, action: action === CLEARTIMEOUT ? CLEARTIMEOUT : CLEARINTERVAL })
  map.delete(uuid)
}

export function setTimeout(handler: Function, timeout?: number, ...args: any[]) {
  return setTimer(SETTIMEOUT, handler, timeout, ...args)
}
export function setInterval(handler: Function, timeout?: number, ...args: any[]) {
  return setTimer(SETINTERVAL, handler, timeout, ...args)
}
export function clearTimeout(id: string) {
  return clear(id, CLEARTIMEOUT)
}
export function clearInterval(id: string) {
  return clear(id, CLEARINTERVAL)
}

export default {
  setTimeout,
  setInterval,
  clearTimeout,
  clearInterval,
}
