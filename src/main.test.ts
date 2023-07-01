import type { RollupOptions } from 'rollup'
import { readPackage } from '@tests/mocks'
import { dts as dtsStub, esbuild as esbuildStub } from '@tests/stubs'
import { unmockFunction } from '@mnrendra/jest-utils'

import main from './main'

describe('Test `index` `core`!', () => {
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

    it('', () => {
      const result = main()

      expect(result).toEqual([
        esbuildStub
      ])

      const external0 = result !== null && typeof result[0].external === 'function' ? result[0].external : () => {}
      expect(external0('', undefined, false)).toBe(true)
      expect(external0('./', undefined, false)).toBe(false)
    })
  })

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

    it('', () => {
      const result = main()

      expect(result).toEqual([
        dtsStub
      ])

      const external0 = result !== null && typeof result[0].external === 'function' ? result[0].external : () => {}
      expect(external0('', undefined, false)).toBe(true)
      expect(external0('./', undefined, false)).toBe(false)
    })
  })

  describe('Without mocking!', () => {
    it('Should return the default value when given an empty argument!', () => {
      const result = main()

      expect(result).toEqual<RollupOptions[]>([
        dtsStub,
        esbuildStub
      ])

      const external0 = result !== null && typeof result[0].external === 'function' ? result[0].external : () => {}
      expect(external0('', undefined, false)).toBe(true)
      expect(external0('./', undefined, false)).toBe(false)

      const external1 = result !== null && typeof result[1].external === 'function' ? result[1].external : () => {}
      expect(external1('', undefined, false)).toBe(true)
      expect(external1('./', undefined, false)).toBe(false)
    })

    it('Should return the default value with modified `input` when given an `input` value!', () => {
      const result = main({
        input: 'src/main.ts'
      })

      expect(result).toEqual<RollupOptions[]>([
        {
          ...dtsStub,
          input: 'src/main.ts'
        },
        {
          ...esbuildStub,
          input: 'src/main.ts'
        }
      ])

      const external0 = result !== null && typeof result[0].external === 'function' ? result[0].external : () => {}
      expect(external0('', undefined, false)).toBe(true)
      expect(external0('./', undefined, false)).toBe(false)

      const external1 = result !== null && typeof result[1].external === 'function' ? result[1].external : () => {}
      expect(external1('', undefined, false)).toBe(true)
      expect(external1('./', undefined, false)).toBe(false)
    })

    it('Should return the default value with modified `output` when given an `output` value!', () => {
      const result = main({
        output: {
          sourcemap: true
        }
      })

      expect(result).toEqual<RollupOptions[]>([
        {
          ...dtsStub,
          output: {
            ...dtsStub.output,
            sourcemap: true
          }
        },
        {
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
        }
      ])

      const external0 = result !== null && typeof result[0].external === 'function' ? result[0].external : () => {}
      expect(external0('', undefined, false)).toBe(true)
      expect(external0('./', undefined, false)).toBe(false)

      const external1 = result !== null && typeof result[1].external === 'function' ? result[1].external : () => {}
      expect(external1('', undefined, false)).toBe(true)
      expect(external1('./', undefined, false)).toBe(false)
    })
  })
})
