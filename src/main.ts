import type { RollupOptions } from 'rollup'
import { dts, esbuild } from './core'

const main = (options: RollupOptions = {}): RollupOptions[] => {
  const configs: RollupOptions[] = []

  const dtsConfig = dts(options)
  const esbuildConfig = esbuild(options)

  if (dtsConfig) configs.push(dtsConfig)
  if (esbuildConfig) configs.push(esbuildConfig)

  return configs
}

export default main
