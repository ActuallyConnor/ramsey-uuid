import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: [
    'lcov',
    'text',
    'json-summary',
  ],
};
export default config;
