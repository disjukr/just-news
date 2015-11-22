import yargs from 'yargs';

import * as build from './build';
import test from './test';

let argv = yargs.argv;
let command = argv._[0];

switch (command) {
case 'build': build.build(); break;
case 'watch': build.watch(); break;
case 'production': build.production(); break;
case 'test': test(); break;
default: throw new Error('알 수 없는 빌드 명령: ' + command);
}
