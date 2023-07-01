import type { RollupOptions } from 'rollup'
import readPackage from '@mnrendra/read-package'
import plugin from 'rollup-plugin-dts'
import { bundle } from '../utils'

const dts = (options: RollupOptions = {}): RollupOptions | null => {
  const { types } = readPackage()

  if (!types) return null

  return bundle({
    ...options,
    plugins: plugin(),
    output: {
      ...options.output,
      file: types,
      format: 'es'
    }
  })
}

export default dts
