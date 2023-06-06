import { readFileSync } from 'node:fs'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

// Output paths
const { main, module, types } = JSON.parse(
  readFileSync(`${process.cwd()}/package.json`, { encoding: 'utf-8' })
)

// Bundler
const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  external: id => !/^[./]/.test(id)
})

// Rollup config
export default [
  // Main Module
  bundle({
    plugins: [esbuild()],
    output: [
      // CommonJs
      {
        file: main,
        format: 'cjs'
      },
      // ES Modules
      {
        file: module,
        format: 'es'
      }
    ]
  }),

  // Declaration Types
  bundle({
    plugins: [dts()],
    output: {
      file: types,
      format: 'es'
    }
  })
]
