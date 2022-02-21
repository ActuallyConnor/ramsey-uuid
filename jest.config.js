/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: [
    "lcov",
    "text",
    "json-summary"
  ]
};
