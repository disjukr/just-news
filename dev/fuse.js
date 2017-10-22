const {
    FuseBox,
    BabelPlugin,
    BannerPlugin,
} = require('fuse-box');
const userscriptMetadataBlock = require('../src/userscript-metadata-block').default;

const babelPlugin = BabelPlugin({
    config: {
        presets: [
            ['env', {
                loose: true,
                useBuiltIns: true,
                targets: {
                    browsers: [
                        'last 2 Chrome versions',
                        'last 2 Firefox versions',
                        'last 2 Edge versions',
                    ],
                }
            }],
        ],
    },
});

const bannerPlugin = BannerPlugin(userscriptMetadataBlock);

const fuse = FuseBox.init({
    homeDir: '../src/',
    output: '../dist/$name.js',
    plugins: [
        babelPlugin,
        bannerPlugin,
    ],
});
fuse.bundle('just-news.user').instructions(`
    > index.ts
    + impl/*.{ts,js}
    + lodash.escaperegexp
    + jquery
`);
fuse.run();
