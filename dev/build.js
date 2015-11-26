import path from 'path';
import webpack from 'webpack';
import sourceMap from 'source-map';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import RawSource from 'webpack-core/lib/RawSource';
import WebpackNotifierPlugin from 'webpack-notifier';

import userscriptMetadataBlock from '../src/userscript-metadata-block';
import * as webpackUtil from './webpack-util';

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

function getCompiler(verbose=true, production=false) {
    let config = webpackUtil.getBaseConfig(); {
        config.entry = {
            'jews': 'jews'
        };
        config.output = {
            path: path.resolve(__dirname, '../dist'),
            filename: 'jews.user.js',
            libraryTarget: 'commonjs'
        };
        config.plugins.push(
            new JewsEmitter()
        );
        if (verbose) {
            config.plugins.push(
                new WebpackNotifierPlugin({ title: 'jews', alwaysNotify: true })
            );
        }
    }
    return webpack(config);
}

export async function build(verbose=true) {
    let compiler = getCompiler(verbose);
    let stats = await webpackUtil.asyncRunCompiler(compiler, verbose);
    if (verbose) console.log(stats.toString({ colors: true }));
};

export function watch() {
    let compiler = getCompiler();
    let lastHash = null;
    compiler.watch({}, (err, stats) => {
        if (err) {
            lastHash = null;
            console.error(err.stack || err);
            if (err.details) console.error(err.details);
            return;
        }
        if (stats.hash !== lastHash) {
            lastHash = stats.hash;
            console.log(stats.toString({ colors: true }));
        }
    });
};

export async function production(verbose=true) {
    let compiler = getCompiler(verbose, true);
    let stats = await webpackUtil.asyncRunCompiler(compiler, verbose);
    if (verbose) console.log(stats.toString({ colors: true }));
};
