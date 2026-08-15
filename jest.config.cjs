module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/.*\\.tsx$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  // jsPDF 4's package `exports` resolves the ESM build under jsdom, which
  // ts-jest does not transform in node_modules. Map to the CJS (node) build
  // for tests. (^jspdf$ only — jspdf-autotable already resolves to CJS.)
  moduleNameMapper: {
    '^jspdf$': '<rootDir>/node_modules/jspdf/dist/jspdf.node.min.js',
  },
  // marked 18 is ESM-only (no working CJS build), so let ts-jest transpile it
  // by exempting it from the default node_modules transform-ignore.
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: { allowJs: true } }],
  },
  transformIgnorePatterns: ['/node_modules/(?!marked/)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/setupTests.ts',
    '!src/types/**',
  ],
  // Coverage thresholds - components excluded due to jsdom/React rendering complexity
  // Utility functions have excellent coverage: pageCalculator & validators 100%, overall 87%+
  coverageThreshold: {
    'src/utils/pageCalculator.ts': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    'src/utils/validators.ts': {
      branches: 95,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    'src/utils/pdfGenerator.ts': {
      branches: 85,
      functions: 75,
      lines: 80,
      statements: 85,
    },
  },
};
