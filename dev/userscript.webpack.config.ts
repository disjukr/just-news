import * as webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

import userscriptMetadataBlock from '../src/userscript-metadata-block';
import getSharedWebpackConfig from './getSharedWebpackConfig';

const config = getSharedWebpackConfig({
    entry: './src/userscript-entry.ts',
    filename: 'just-news.user.js',
});
config.optimization = {
    minimizer: [
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                output: {
                    comments: /^ (?:@|==U|==\/U)/,
                },
            },
        }),
    ],
};
config.plugins!.push(
    new webpack.BannerPlugin({
        banner: userscriptMetadataBlock,
        raw: true,
        entryOnly: true,
    }),
);

export default config;
