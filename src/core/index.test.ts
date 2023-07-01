import type { RollupOptions } from 'rollup'
import { readPackage } from '@tests/mocks'
import { dts as dtsStub, esbuild as esbuildStub } from '@tests/stubs'
import { unmockFunction } from '@mnrendra/jest-utils'

import { dts, esbuild } from '.'

describe('Test `index` `core`!', () => {
  describe('Test `dts` `core`!', () => {
    describe('By mocking `package.json` with `types` value is `undefined`!', () => {
      beforeAll(() => {
        readPackage.mockReturnValue({
          ...readPackage(),
          types: undefined
        })
      })

      afterAll(() => {
        unmockFunction(readPackage)
      })

      it('Should return `null` when the value of `types` in `package.json` is `undefined`!', () => {
        const result = dts()
        expect(result).toBe(null)
      })
    })

    describe('Without mocking!', () => {
      it('Should return the default value when given an empty argument!', () => {
        const result = dts()

        expect(result).toEqual<RollupOptions>(dtsStub)

        const external = result !== null && typeof result.external === 'function' ? result.external : () => {}
        expect(external('', undefined, false)).toBe(true)
        expect(external('./', undefined, false)).toBe(false)
      })

      it('Should return the default value with modified `input` when given an `input` value!', () => {
        const result = dts({
          input: 'src/main.ts'
        })

        expect(result).toEqual<RollupOptions>({
          ...dtsStub,
          input: 'src/main.ts'
        })

        const external = result !== null && typeof result.external === 'function' ? result.external : () => {}
        expect(external('', undefined, false)).toBe(true)
        expect(external('./', undefined, false)).toBe(false)
      })

      it('Should return the default value with modified `output` when given an `output` value!', () => {
        const result = dts({
          output: {
            sourcemap: true
          }
        })

        expect(result).toEqual<RollupOptions>({
          ...dtsStub,
          output: {
            ...dtsStub.output,
            sourcemap: true
          }
        })

        const external = result !== null && typeof result.external === 'function' ? result.external : () => {}
        expect(external('', undefined, false)).toBe(true)
        expect(external('./', undefined, false)).toBe(false)
      })
    })
  })

  describe('Test `esbuild` `core`!', () => {
    describe('By mocking `package.json` with `main` and `module` values are `undefined`!', () => {
      beforeAll(() => {
        readPackage.mockReturnValue({
          ...readPackage(),
          main: undefined,
          module: undefined
        })
      })

      afterAll(() => {
        unmockFunction(readPackage)
      })

      it('Should return `null` when the value of `main` and `module` in `package.json` is `undefined`!', () => {
        const result = esbuild()
        expect(result).toBe(null)
      })
    })

    describe('Without mocking!', () => {
      it('Should return the default value when given an empty argument!', () => {
        const result = esbuild()

        expect(result).toEqual<RollupOptions>(esbuildStub)

        const external = result !== null && typeof result.external === 'function' ? result.external : () => {}
        expect(external('', undefined, false)).toBe(true)
        expect(external('./', undefined, false)).toBe(false)
      })

      it('Should return the default value with modified `input` when given an `input` value!', () => {
        const result = esbuild({
          input: 'src/main.ts'
        })

        expect(result).toEqual<RollupOptions>({
          ...esbuildStub,
          input: 'src/main.ts'
        })

        const external = result !== null && typeof result.external === 'function' ? result.external : () => {}
        expect(external('', undefined, false)).toBe(true)
        expect(external('./', undefined, false)).toBe(false)
      })

      it('Should return the default value with modified `output` when given an `output` value!', () => {
        const result = esbuild({
          output: {
            sourcemap: true
          }
        })

        expect(result).toEqual<RollupOptions>({
          ...esbuildStub,
          output: [
            {
              ...esbuildStub.output[0],
              sourcemap: true
            },
            {
              ...esbuildStub.output[1],
              sourcemap: true
            }
          ]
        })

        const external = result !== null && typeof result.external === 'function' ? result.external : () => {}
        expect(external('', undefined, false)).toBe(true)
        expect(external('./', undefined, false)).toBe(false)
      })
    })
  })
})
