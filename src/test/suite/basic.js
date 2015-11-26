import assert from 'assert';
import fs from 'fs';

import electron from 'electron';
const { BrowserWindow, ipcMain } = electron;

const jews = fs.readFileSync('dist/jews.user.js');

function t(url) {
    return new Promise((resolve, reject) => {
        let window = new BrowserWindow({
            webPreferences: {
                nodeIntegration: false
            },
            show: true
        });
        let wc = window.webContents;
        ipcMain.on('test', (e, v) => console.log(v));
        ipcMain.on('jews-done', () => resolve());
        ipcMain.on('jews-error', (event, err) => reject(err));
        window.loadURL(url);
        window.webContents.executeJavaScript(jews);
    });
}

describe('파싱 중에 에러가 나면 안됨', function () {
    this.timeout(0);
    it('한겨레', async () => {
        await t('http://www.hani.co.kr/arti/society/schooling/718916.html'); //#211
    });
});
