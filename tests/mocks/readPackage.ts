import originalModule from '@mnrendra/read-package'
import { mockFunction } from '@mnrendra/jest-utils'

jest.mock('@mnrendra/read-package')

export default mockFunction(originalModule, '@mnrendra/read-package')
