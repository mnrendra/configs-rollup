import type { RollupOptions, ExternalOption } from 'rollup'

interface DTSStub extends RollupOptions {
  external: Extract<ExternalOption, (...args: any) => any>
  input: string
  plugins: {
    name: 'dts'
    options: (...args: any) => any
    outputOptions: (...args: any) => any
    renderChunk: (...args: any) => any
    resolveId: (...args: any) => any
    transform: (...args: any) => any
  }
  output: {
    file: string
    format: 'es'
  }
}

const dts: DTSStub = {
  external: expect.any(Function),
  input: 'src/index.ts',
  plugins: {
    name: 'dts',
    options: expect.any(Function),
    outputOptions: expect.any(Function),
    renderChunk: expect.any(Function),
    resolveId: expect.any(Function),
    transform: expect.any(Function)
  },
  output: {
    file: 'dist/index.d.ts',
    format: 'es'
  }
}

export default dts
