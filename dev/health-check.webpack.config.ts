import getSharedWebpackConfig from './getSharedWebpackConfig';

const config = getSharedWebpackConfig({
    entry: './src/test/health-check/browser-entry.ts',
    filename: 'health-check.js',
    outputDir: 'tmp',
});

export default config;
