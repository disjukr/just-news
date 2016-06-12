import path from 'path';
import webpack from 'webpack';
import sourceMap from 'source-map';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import RawSource from 'webpack-core/lib/RawSource';
import WebpackNotifierPlugin from 'webpack-notifier';

import userscriptMetadataBlock from '../src/userscript-metadata-block';
import * as webpackUtil from './webpack-util';

// userscript comment를 jews.user.js 상단에 붙이고
// sourcemap을 보정하는 webpack plugin
class JewsEmitter {
    constructor(production) {
        this.production = production;
    }
    apply(compiler) {
        compiler.plugin('emit', (compilation, done) => {
            const jewsSource = compilation.assets['jews.user.js'].source();
            if (!compilation.assets['jews.user.js.map']) {
                compilation.assets['jews.user.js'] = new RawSource(
                    userscriptMetadataBlock + jewsSource
                );
            } else {
                const jewsSourceMap = JSON.parse(compilation.assets['jews.user.js.map'].source());
                const userscriptMetadataBlockLoc = userscriptMetadataBlock.split('\n').length;
                let jewsSourceMapString;
                let jewsSourceMapBase64;
                { // manipulate source map
                    const smc = new sourceMap.SourceMapConsumer(jewsSourceMap);
                    const smg = sourceMap.SourceMapGenerator.fromSourceMap(smc);
                    for (let mapping of smg._mappings._array) {
                        mapping.generatedLine += userscriptMetadataBlockLoc;
                    }
                    jewsSourceMapString = smg.toString();
                    jewsSourceMapBase64 = new Buffer(jewsSourceMapString).toString('base64');
                }
                { // emit `jews.user.js`, `jews.user.js.map`
                    const sourceMappingURLComment = this.production ?
                        '//# sourceMappingURL=https://github.com/disjukr/jews/raw/release/dist/jews.user.js.map' :
                        '//# sourceMappingURL=data:application/json;base64,' + jewsSourceMapBase64
                    compilation.assets['jews.user.js'] = new RawSource(
                        userscriptMetadataBlock +
                        jewsSource.replace(/\/\/# sourceMappingURL.*/, '') +
                        sourceMappingURLComment
                    );
                    if (this.production) {
                        compilation.assets['jews.user.js.map'] = new RawSource(
                            jewsSourceMapString
                        );
                    } else {
                        delete compilation.assets['jews.user.js.map'];
                    }
                }
            }
            done();
        });
    }
}

function getCompiler(verbose=true, production=false) {
    const config = webpackUtil.getBaseConfig(); {
        config.entry = {
            'jews': 'jews'
        };
        config.output = {
            path: path.resolve(__dirname, '../dist'),
            filename: 'jews.user.js'
        };
        config.plugins.push(
            new JewsEmitter(production)
        );
        if (verbose) {
            config.plugins.push(
                new WebpackNotifierPlugin({ title: 'jews', alwaysNotify: true })
            );
        }
        if (production) {
            config.plugins.push(
                new UglifyJsPlugin({
                    compress: {
                        screw_ie8: true
                    }
                })
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
