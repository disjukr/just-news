import * as path from 'path';
import * as webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

import userscriptMetadataBlock from '../src/userscript-metadata-block';

const config: webpack.Configuration = {
    mode: process.env.NODE_ENV as webpack.Configuration['mode'],
    entry: './src/userscript-entry.ts',
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
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['babel-plugin-macros'],
                        presets: ['@babel/preset-typescript', '@babel/preset-env'],
                    },
                },
            },
        ],
    },
    optimization: {
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
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.BannerPlugin({
            banner: userscriptMetadataBlock,
            raw: true,
            entryOnly: true,
        }),
    ],
};

export default config;
