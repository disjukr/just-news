import childProcess from 'child_process';
import path from 'path';
import electron from 'electron-prebuilt';
import webpack from 'webpack';
import sourceMap from 'source-map';

import getBaseConfig from './base-config';

let config = getBaseConfig(); {
    config.entry = {
        'test': 'test'
    };
    config.output = {
        path: path.resolve(__dirname, '../tmp'),
        filename: '[name].js',
        libraryTarget: 'commonjs'
    };
    config.externals = ['electron'];
}

let compiler = webpack(config);

export default function test() {
    compiler.run(err => {
        if (err) throw err;
        let testProc = childProcess.spawn(
            electron,
            [path.resolve(__dirname, '../tmp/test.js')],
            { stdio: 'pipe' }
        );
        process.on('uncaughtException', err => {
            console.error(err.stack);
            testProc.kill();
        });
        testProc.stdout.pipe(process.stdout);
        testProc.stderr.pipe(process.stderr);
        testProc.on('close', code => process.exit(code));
        testProc.on('exit', code => process.exit(code));
    });
};
