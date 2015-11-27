import electron from 'electron';
import Mocha from './jews-mocha';

const { app } = electron;

electron.hideInternalModules();

process.on('uncaughtException', err => {
    console.error(err.stack);
    app.exit(1);
});

app.on('ready', () => {
    let mocha = new Mocha();
    mocha.run(fail => {
        if (fail) app.exit(1);
        else app.exit(0);
    });
});
