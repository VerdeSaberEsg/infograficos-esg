module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/)+packages/shared/(.*)\\.js$': '<rootDir>/packages/shared/$2'
  },
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: './tsconfig.json',
      diagnostics: false
    }
  }
};
