import * as path from 'path';
import * as webpack from 'webpack';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import userscriptMetadataBlock from '../src/userscript-metadata-block';

const config: webpack.Configuration = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'just-news.user.js',
        path: path.resolve(__dirname, '..', 'dist'),
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: '@sucrase/webpack-loader',
                    options: { transforms: [] },
                },
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: '@sucrase/webpack-loader',
                    options: { transforms: ['typescript'] },
                },
            },
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                uglifyOptions: {
                    output: {
                        comments: /^ (?:@|==U|==\/U)/,
                    },
                },
            }),
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: userscriptMetadataBlock,
            raw: true,
            entryOnly: true,
        }),
    ],
};

export default config;
