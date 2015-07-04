import path from 'path';
import optimist from 'optimist';
import webpack from 'webpack';
import sourceMap from 'source-map';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import RawSource from 'webpack-core/lib/RawSource';
import userscriptMetadataBlock from './src/userscript-metadata-block';
import WebpackNotifierPlugin from 'webpack-notifier';

// jews emitter
class JewsEmitter {
    apply(compiler) {
        compiler.plugin('emit', (compilation, done) => {
            let jewsSource = compilation.assets['jews.user.js'].source();
            if (!compilation.assets['jews.user.js.map']) {
                compilation.assets['jews.user.js'] = new RawSource(
                    userscriptMetadataBlock + jewsSource
                );
            } else {
                let jewsSourceMap = JSON.parse(compilation.assets['jews.user.js.map'].source());
                let jewsSourceMapBase64;
                let userscriptMetadataBlockLoc = userscriptMetadataBlock.split('\n').length;
                { // manipulate source map
                    let smc = new sourceMap.SourceMapConsumer(jewsSourceMap);
                    let smg = sourceMap.SourceMapGenerator.fromSourceMap(smc);
                    for (let mapping of smg._mappings._array) {
                        mapping.generatedLine += userscriptMetadataBlockLoc;
                    }
                    let jewsSourceMapString = smg.toString();
                    jewsSourceMapBase64 = new Buffer(jewsSourceMapString).toString('base64');
                    delete compilation.assets['jews.user.js.map'];
                }
                { // emit jews.user.js
                    compilation.assets['jews.user.js'] = new RawSource(
                        userscriptMetadataBlock +
                        jewsSource.replace(/\/\/# sourceMappingURL.*/, '') +
                        '//# sourceMappingURL=data:application/json;base64,' +
                        jewsSourceMapBase64
                    );
                }
            }
            done();
        });
    }
}

// config
let config = {
    entry: {
        'jews.user': 'jews.user'
    },
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.min.js'],
        modulesDirectories: ['src', 'node_modules']
    },
    node: {
        filename: true,
        global: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [ path.resolve(__dirname, 'src') ],
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new JewsEmitter(),
        new WebpackNotifierPlugin({ title: 'jews', alwaysNotify: true })
    ]
};

// build
let argv = optimist.argv;
if (argv.production) {
    delete config.devtool;
    config.plugins.push(new UglifyJsPlugin());
}

let compiler = webpack(config);
let lastHash = null;
function compilerCallback(err, stats) {
    if (!argv.watch) {
        compiler.purgeInputFileSystem();
    }
    if (err) {
        lastHash = null;
        console.error(err.stack || err);
        if (err.details) console.error(err.details);
        if (!argv.watch) {
            process.on('exit', function() {
                process.exit(1);
            });
        }
        return;
    }
    if (stats.hash !== lastHash) {
        lastHash = stats.hash;
        process.stdout.write(stats.toString({ colors: true }) + '\n');
    }
}
if (argv.watch) {
    compiler.watch({}, compilerCallback);
} else {
    compiler.run(compilerCallback);
}
