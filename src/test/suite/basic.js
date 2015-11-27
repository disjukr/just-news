import assert from 'assert';

import electron from 'electron';
const { BrowserWindow, ipcMain } = electron;

function jews(url) {
    return new Promise((resolve, reject) => {
        if (jews.cache[url]) return resolve(jews.cache[url]);
        let window = new BrowserWindow({
            show: process.env.JEWS_SHOW_ELECTRON_WINDOW === 'show'
        });
        ipcMain.on('jews-done', (event, result) => {
            jews.cache[url] = result;
            resolve(result);
        });
        ipcMain.on('jews-error', (event, err) => reject(err));
        window.loadURL(url);
        window.webContents.executeJavaScript(`
            try {
                eval(require('fs').readFileSync('dist/jews.user.js', 'utf-8'));
            } catch (e) {
                require('electron').ipcRenderer.sendSync('jews-error', e);
            }
        `);
    });
}
jews.cache = {};

describe('파싱 중에 에러가 나면 안됨', function () {
    this.timeout(0);
    it('한겨레', async () => {
        await jews('http://www.hani.co.kr/arti/society/schooling/718916.html'); // #211
    });
});


async function testTimestampParsing(url) {
    let jewsResult = await jews(url);
    let t = jewsResult.timestamp;
    if (t) {
        if (t.created === 'Invalid Date') throw new Error('잘못된 작성일');
        if (t.lastModified === 'Invalid Date') throw new Error('잘못된 마지막 수정일');
    }
}

describe('날짜 파싱에 실패하면 안됨', function () {
    this.timeout(0);
    it('마이데일리', async () => {
        await testTimestampParsing('http://www.mydaily.co.kr/new_yk/html/read.php?newsid=201511192101592220&ext=na'); // #208
    });
});


async function testTitleParsing(url) {
    let jewsResult = await jews(url);
    switch (jewsResult.title) {
    case undefined: throw new Error('제목이 undefined');
    case '': throw new Error('제목이 비어있음');
    }
}

describe('제목이 비어있으면 안됨', function () {
    this.timeout(0);
    it('마이데일리', async () => {
        await testTitleParsing('http://www.mydaily.co.kr/new_yk/html/read.php?newsid=201511192101592220&ext=na'); // #208
    });
});
