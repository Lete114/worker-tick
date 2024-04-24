export default workerCode
export function workerCode() {
  const { self } = globalThis
  self.addEventListener('message', (event: MessageEvent<TWorkerTick>) => {
    const { uuid, id, action, timeout, args = [] } = event.data

    const timerFunctions = {
      setTimeout() {
        const id = setTimeout(() => {
          self.postMessage({ id, finishId: uuid })
        }, timeout)
      },
      setInterval() {
        const id = setInterval(() => {
          self.postMessage({ id, finishId: uuid })
        }, timeout, ...args)
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
