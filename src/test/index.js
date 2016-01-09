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

// 모든 창이 닫히면 기본적으로 electron은 꺼지도록 되어있습니다.
// 이 코드는 해당 동작을 무효화합니다.
app.on('window-all-closed', () => void 0);
