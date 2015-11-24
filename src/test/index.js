import electron from 'electron';
import Mocha from './jews-mocha';

const { app } = electron;
electron.hideInternalModules();

let mocha = new Mocha();

mocha.run(fail => {
    if (fail) app.exit(1);
    else app.exit(0);
});
