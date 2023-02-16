import { Config } from 'jest'
import config from './jest.config'

const configForE2E: Config = {
  ...config,
  rootDir: 'test',
  testRegex: '.e2e-spec.ts$',
}

export default configForE2E
