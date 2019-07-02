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
            extensions: ['.js', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
                                'babel-plugin-macros',
                            ],
                            presets: [
                                ['@babel/preset-typescript', { jsxPragma: 'h' }],
                                '@babel/preset-env',
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    sideEffects: true,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ],
    };
}
