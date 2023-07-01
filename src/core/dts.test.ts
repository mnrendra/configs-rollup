import type { RollupOptions } from 'rollup'

import { readPackage } from '@tests/mocks'
import { dts as dtsStub } from '@tests/stubs'
import { unmockFunction } from '@mnrendra/jest-utils'

import dts from './dts'

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
