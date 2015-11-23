import path from 'path';
import webpack from 'webpack';
import sourceMap from 'source-map';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import RawSource from 'webpack-core/lib/RawSource';
import WebpackNotifierPlugin from 'webpack-notifier';

import userscriptMetadataBlock from '../src/userscript-metadata-block';
import getBaseConfig from './base-config';

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

let config = getBaseConfig(); {
    config.entry = {
        'jews.user': 'jews.user'
    };
    config.output = {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    };
    config.plugins.push(
        new JewsEmitter(),
        new WebpackNotifierPlugin({ title: 'jews', alwaysNotify: true })
    );
}

let compiler = webpack(config);
let lastHash = null;
let watchFlag = false;

export function build() {
    compiler.run(compilerCallback);
};

export function watch() {
    watchFlag = true;
    compiler.watch({}, compilerCallback);
};

export function production() {
    delete config.devtool;
    config.plugins.push(new UglifyJsPlugin());
    compiler.run(compilerCallback);
};


function compilerCallback(err, stats) {
    if (!watchFlag) {
        compiler.purgeInputFileSystem();
    }
    if (err) {
        lastHash = null;
        console.error(err.stack || err);
        if (err.details) console.error(err.details);
        if (!watchFlag) {
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
