# worker-tick

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Make setTimeout() and setInterval() timers work stably in background tabs (unfocused browser tabs)

Browsers reduce the frequency of setTimeout() and setInterval() when a browser tab is inactive (e.g., loses focus, switches to another tab, or switches to another application) for performance optimization reasons requestAnimationFrame() does the same thing

## Install

Using npm:

```bash
npm install worker-tick
```

## Usage

Refer to [development](https://github.com/Lete114/worker-tick/blob/main/development/index.ts) in the repository

```diff
import workerTick from 'worker-tick'

- window.setInterval(console.log, 1000, 1, 2, 3)
+ workerTick.setInterval(console.log, 1000, 1, 2, 3)
// => Printouts per second: 1 2 3

// clear
const timerId = workerTick.setInterval(console.log, 1000, 1, 2, 3)
workerTick.clearInterval(timerId)

// setTimeout() Same as above
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [Lete114](https://github.com/lete114)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/worker-tick?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/worker-tick
[npm-downloads-src]: https://img.shields.io/npm/dm/worker-tick?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/worker-tick
[bundle-src]: https://img.shields.io/bundlephobia/minzip/worker-tick?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=worker-tick
[license-src]: https://img.shields.io/github/license/lete114/worker-tick.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/lete114/worker-tick/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/worker-tick
