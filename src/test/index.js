import electron from 'electron';
import Mocha from './jews-mocha';

const { app } = electron;
console.log('a');
electron.hideInternalModules();
console.log('b');
let mocha = new Mocha();
console.log('c');
mocha.run(fail => {
    if (fail) app.exit(1);
    else app.exit(0);
});
