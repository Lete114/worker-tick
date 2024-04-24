import { workerCode } from './worker'
import { getUUID } from './utils'

const SETTIMEOUT = 'setTimeout'
const CLEARTIMEOUT = 'clearTimeout'
const SETINTERVAL = 'setInterval'
const CLEARINTERVAL = 'clearInterval'

const code = `(${workerCode})()`
const blob = new Blob([code], { type: 'application/javascript' })
const url = URL.createObjectURL(blob)

const worker = new Worker(url)

const map = new Map<string, { id?: number, handler: Function, args: any[] }>()

worker.addEventListener('message', (event: MessageEvent<{ id: number, finishId: string }>) => {
  const { id, finishId } = event.data
  const data = map.get(finishId)

  if (id && finishId && data) {
    const { handler, args } = data
    map.set(finishId, { id, handler, args })

    handler(...args)
  }
})

function setTimer(action: TWorkerTick['action'], handler: Function, timeout?: number, ...args: any[]) {
  const uuid = getUUID()
  map.set(uuid, { handler, args })
  const params: TWorkerTick = {
    uuid,
    args,
    action,
    timeout,
  }

  worker.postMessage(params)
  return {
    clear() {
      const { id } = map.get(uuid)!
      worker.postMessage({ id, action: action === SETTIMEOUT ? CLEARTIMEOUT : CLEARINTERVAL })
      map.delete(uuid)
    },
  }
}

export function setTimeout(handler: Function, timeout?: number, ...args: any[]) {
  return setTimer(SETTIMEOUT, handler, timeout, ...args)
}
export function setInterval(handler: Function, timeout?: number, ...args: any[]) {
  return setTimer(SETINTERVAL, handler, timeout, ...args)
}

export default {
  setTimeout,
  setInterval,
}
