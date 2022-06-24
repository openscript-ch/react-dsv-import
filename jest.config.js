module.exports = {
  roots: ['./src'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testPathIgnorePatterns: ['node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.(ts|tsx)'],
  collectCoverageFrom: ['**/!(*.stories).(ts|tsx)'],
  moduleNameMapper: {},
};
