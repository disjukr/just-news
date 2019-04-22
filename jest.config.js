module.exports = {
    preset: 'jest-puppeteer',
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['**/*.[jt]s'],
    transform: {
        '^src/.+\\.ts$': 'ts-jest',
    },
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
};
