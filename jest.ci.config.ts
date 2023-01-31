import { Config } from 'jest';
import config from './jest.config';
import configForE2E from './jest.e2e.config';

const testRegexesIn = (aConfig: Config): string[] =>
  typeof aConfig.testRegex === 'string'
    ? [aConfig.testRegex]
    : aConfig.testRegex;

const {
  moduleFileExtensions,
  transform,
  collectCoverageFrom,
  testEnvironment,
} = config;

const configForCI: Config = {
  moduleFileExtensions,
  transform,
  collectCoverageFrom,
  testEnvironment,
  // The rootDir must be specified since coverageDirectory, collectCoverageFrom and roots are relative to it
  coverageDirectory: 'coverage',
  rootDir: '',
  roots: [config.rootDir, configForE2E.rootDir],
  testRegex: [...testRegexesIn(config), ...testRegexesIn(configForE2E)],
};

export default configForCI;
