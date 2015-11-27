import yargs from 'yargs';

import * as build from './build';
import test from './test';

let argv = yargs.argv;
let command = argv._[0];

// global을 굳이 붙인 이유는
// babel이 process.env.JEWS를 날려먹지 못하도록 하기 위해서입니다.
global.process.env.JEWS = command;

switch (command) {
case 'build': build.build(); break;
case 'watch': build.watch(); break;
case 'production': build.production(); break;
case 'test': test(argv.showElectronWindow); break;
default: throw new Error('알 수 없는 빌드 명령: ' + command);
}
