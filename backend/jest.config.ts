module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '\\.test\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    // Set the global test timeout to 10 seconds
    testTimeout: 100000,
};