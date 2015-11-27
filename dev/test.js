import childProcess from 'child_process';
import path from 'path';
import electron from 'electron-prebuilt';
import webpack from 'webpack';
import sourceMap from 'source-map';

import { build } from './build';
import * as webpackUtil from './webpack-util';

let config = webpackUtil.getBaseConfig(); {
    config.entry = {
        'test': 'test'
    };
    config.output = {
        path: path.resolve(__dirname, '../tmp'),
        filename: '[name].js',
        libraryTarget: 'commonjs'
    };
}

let compiler = webpack(config);

export default async function test(showElectronWindow=false) {
    { // dist/jews.user.js
        console.log('building jews.user.js...');
        await build(false);
    }
    { // tmp/test.js
        console.log('building test resources...');
        global.process.env.JEWS_SHOW_ELECTRON_WINDOW = showElectronWindow ? 'show' : 'hide';
        await webpackUtil.asyncRunCompiler(compiler);
    }
    { // run test
        let testProc = childProcess.spawn(
            electron,
            [path.resolve(__dirname, '../tmp/test.js')],
            { stdio: 'inherit' }
        );
        process.on('uncaughtException', err => {
            console.error(err.stack);
            testProc.kill();
            process.exit(2);
        });
        testProc.on('error', err => {
            console.error(err.stack);
            process.exit(3);
        });
        testProc.on('close', code => process.exit(code));
        testProc.on('exit', code => process.exit(code));
    }
};
