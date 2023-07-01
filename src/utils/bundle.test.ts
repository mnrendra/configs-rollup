import bundle from './bundle'

describe('Test `bundle` `utils`!', () => {
  it('Should return the default value when given an empty argument!', () => {
    const result = bundle()

    expect(result).toEqual({
      input: 'src/index.ts',
      external: expect.any(Function)
    })

    const external = typeof result.external === 'function' ? result.external : () => {}
    expect(external('', undefined, false)).toBe(true)
    expect(external('./', undefined, false)).toBe(false)
  })

  it('Should return the default value with modified `input` when given an `input` value!', () => {
    const result = bundle({ input: 'src/main.ts' })

    expect(result).toEqual({
      input: 'src/main.ts',
      external: expect.any(Function)
    })

    const external = typeof result.external === 'function' ? result.external : () => {}
    expect(external('', undefined, false)).toBe(true)
    expect(external('./', undefined, false)).toBe(false)
  })
})
