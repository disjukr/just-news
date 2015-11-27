import assert from 'assert';

import electron from 'electron';
const { BrowserWindow, ipcMain } = electron;

function t(url) {
    return new Promise((resolve, reject) => {
        let window = new BrowserWindow({
            show: process.env.JEWS_SHOW_ELECTRON_WINDOW === 'show'
        });
        let wc = window.webContents;
        ipcMain.on('jews-done', () => resolve());
        ipcMain.on('jews-error', (event, err) => reject(err));
        console.log('테스트 페이지를 여는 중...');
        console.log(`url: ${ url }`);
        window.loadURL(url);
        window.webContents.on('did-finish-load', () => {
            console.log('jews를 실행하는 중...');
            window.webContents.executeJavaScript(`
                try {
                    eval(require('fs').readFileSync('dist/jews.user.js', 'utf-8'));
                } catch (e) {
                    require('electron').ipcRenderer.sendSync('jews-error', e);
                }
            `);
        });
    });
}

describe('파싱 중에 에러가 나면 안됨', function () {
    this.timeout(0);
    it('한겨레', async () => {
        await t('http://www.hani.co.kr/arti/society/schooling/718916.html'); //#211
    });
});
