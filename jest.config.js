



module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "<rootDir>/testing/setup.ts",
  globalTeardown: "<rootDir>/testing/teardown.ts",
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"

  },
  moduleNameMapper: {

  },
  modulePathIgnorePatterns: [

  ],
  maxWorkers: 1
};
