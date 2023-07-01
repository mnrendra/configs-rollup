import type { RollupOptions, OutputOptions } from 'rollup'
import readPackage from '@mnrendra/read-package'
import plugin from 'rollup-plugin-esbuild'
import { bundle } from '../utils'

const esbuild = (options: RollupOptions = {}): RollupOptions | null => {
  const { main, module } = readPackage()

  if (!main && !module) return null

  const output: OutputOptions[] = []

  if (main) {
    output.push({
      ...options.output,
      file: main,
      format: 'cjs'
    })
  }

  if (module) {
    output.push({
      ...options.output,
      file: module,
      format: 'es'
    })
  }

  return bundle({
    ...options,
    plugins: plugin(),
    output
  })
}

export default esbuild
