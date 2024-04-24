import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { name } from './package.json'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
      root: resolve(__dirname, 'development'),
    }
  }
  else {
    // command === 'build'
    return {
      // build 独有配置
      build: {
        lib: {
          entry: 'src/main.ts',
          formats: ['es', 'iife', 'umd'],
          name: 'workerTick',
          fileName(format) {
            return `${name}.${format}.js`
          },
        },
      },
      plugins: [dts({ rollupTypes: true })],
    }
  }
})
