import {
    FuseBox,
    BannerPlugin,
} from 'fuse-box';
import userscriptMetadataBlock from '../src/userscript-metadata-block';


const bannerPlugin = BannerPlugin(userscriptMetadataBlock);

const fuse = FuseBox.init({
    target: 'browser@es2015',
    useTypescriptCompiler: true,
    homeDir: '../src/',
    output: '../dist/$name.js',
    plugins: [
        bannerPlugin,
    ],
});
fuse.bundle('just-news.user').instructions(`
    > index.ts
    + impl/*.{ts,js}
    + lodash.escaperegexp
    + jquery
    + moment
`);
fuse.run();
