import {
    FuseBox,
    BabelPlugin,
    BannerPlugin,
} from 'fuse-box';
import userscriptMetadataBlock from '../src/userscript-metadata-block';

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
    target: 'browser@es2015',
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
