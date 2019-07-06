import * as path from 'path';
import * as webpack from 'webpack';

interface GetConfigOption {
    entry: string;
    filename: string;
    outputDir?: 'dist' | 'tmp';
}
export default function getSharedWebpackConfig(option: GetConfigOption): webpack.Configuration {
    const mode = (process.env.NODE_ENV || 'development') as webpack.Configuration['mode'];
    const isDev = mode === 'development';
    const babelOptions = {
        plugins: [
            ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
            'babel-plugin-macros',
        ],
        presets: [
            ['@babel/preset-typescript', { jsxPragma: 'h' }],
            '@babel/preset-env',
        ],
    };
    return {
        mode,
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
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'babel-loader', options: babelOptions },
                    ],
                },
                {
                    test: /\/view\/.+\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'babel-loader', options: babelOptions },
                        { loader: 'linaria/loader', options: {
                            sourceMap: isDev,
                            displayName: isDev,
                            babelOptions,
                        } },
                    ],
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    sideEffects: true,
                    use: [
                        { loader: path.resolve('./dev/lazy-style-loader.ts') },
                        { loader: 'postcss-loader', options: {
                            config: { path: './dev' },
                            sourceMap: isDev ? 'inline' : false,
                        } },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ],
    };
}
