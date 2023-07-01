import type { RollupOptions, ExternalOption } from 'rollup'

type ExternalFunction = Extract<ExternalOption, (...args: any) => any>
type Params = Parameters<ExternalFunction>
type Return = ReturnType<ExternalFunction>

const bundle = (config: RollupOptions = {}): RollupOptions => ({
  input: 'src/index.ts',
  external: (...args: Params): Return => !/^[./]/.test(args[0]),
  ...config
})

export default bundle
