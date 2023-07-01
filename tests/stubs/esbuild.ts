import type { RollupOptions, ExternalOption } from 'rollup'

interface ESBuildStub extends RollupOptions {
  external: Extract<ExternalOption, (...args: any) => any>
  input: string
  plugins: {
    name: 'esbuild'
    options: (...args: any) => any
    buildStart: (...args: any) => any
    renderChunk: (...args: any) => any
    resolveId: (...args: any) => any
    transform: (...args: any) => any
  }
  output: [
    {
      file: string
      format: 'cjs'
    },
    {
      file: string
      format: 'es'
    }
  ]
}

const esbuild: ESBuildStub = {
  external: expect.any(Function),
  input: 'src/index.ts',
  plugins: {
    name: 'esbuild',
    options: expect.any(Function),
    buildStart: expect.any(Function),
    renderChunk: expect.any(Function),
    resolveId: expect.any(Function),
    transform: expect.any(Function)
  },
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.mjs',
      format: 'es'
    }
  ]
}

export default esbuild
