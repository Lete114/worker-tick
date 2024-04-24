import workerTick from '../src/main'

function setupCounter(element: Element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)

  // 👇 -------------- 👇
  window.setInterval(() => setCounter(counter + 1), 4000)
}

function setupCounter2(element: Element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)

  // 👇 -------------- 👇
  workerTick.setInterval(() => setCounter(counter + 1), 4000)
}

const counter = document.querySelector('#counter')!
const counter2 = document.querySelector('#counter2')!

setupCounter(counter)
setupCounter2(counter2)