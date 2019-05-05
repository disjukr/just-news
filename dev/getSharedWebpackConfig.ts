import * as path from 'path';
import * as webpack from 'webpack';

interface GetConfigOption {
    entry: string;
    filename: string;
    outputDir?: 'dist' | 'tmp';
}
export default function getSharedWebpackConfig(option: GetConfigOption): webpack.Configuration {
    return {
        mode: (process.env.NODE_ENV || 'development') as webpack.Configuration['mode'],
        entry: option.entry,
        output: {
            filename: option.filename,
            path: path.resolve(__dirname, '..', option.outputDir || 'dist'),
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
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ],
    };
}
