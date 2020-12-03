module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testRegex: '(/__tests__/.*|.(test|spec)).(jsx?|tsx?)$',

  testPathIgnorePatterns: [
    '.snap$',
    '<rootDir>/node_modules/',
    'setup.js',
    '<rootDir>/__tests__/test-cover.tsx',
    '<rootDir>/__tests__/setup.js',
    '<rootDir>/__tests__/test-navigation-cover.tsx',
    'node_modules/(?!(jest-)?react-native|@?react-navigation)',
  ],
  setupFiles: ['./__tests__/setup.js', './node_modules/react-native-gesture-handler/jestSetup.js'],
  moduleNameMapper: {
    '\.svg': '<rootDir>/__mocks__/svgMock.js',
    '\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  cacheDirectory: '.jest/cache',
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)/'],
};
