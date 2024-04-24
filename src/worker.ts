export default workerCode
export function workerCode() {
  const { self } = globalThis
  self.addEventListener('message', (event: MessageEvent<TWorkerTick>) => {
    const { uuid, id, action, timeout, args = [] } = event.data

    const timerFunctions = {
      setTimeout() {
        const timerId = setTimeout(() => {
          self.postMessage({ uuid, finish: true })
        }, timeout)
        self.postMessage({ id: timerId, uuid })
      },
      setInterval() {
        const timerId = setInterval(() => {
          self.postMessage({ uuid, finish: true })
        }, timeout, ...args)
        self.postMessage({ id: timerId, uuid })
      },
      clearInterval() {
        clearInterval(id)
      },
      clearTimeout() {
        clearTimeout(id)
      },
    }
    timerFunctions[action] && timerFunctions[action]()
  })
}
