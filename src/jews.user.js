import sites from './sites';
import reconstruct from './reconstruct';


export function waitWhilePageIsLoading() {
    return new Promise(resolve => {
        switch (document.readyState) {
        case 'interactive': case 'complete': { resolve(); break; }
        default: {
            window.addEventListener('DOMContentLoaded', resolve);
        } break;
        }
    });
};

export function checkUrl(pattern, url=window.location.href) {
    return (new RegExp(
        RegExp.escape(pattern).replace(/\\\*/g, '.*')
    )).test(url);
};

export function here() {
    for (let site in sites) {
        for (let pattern of sites[site]) {
            if (checkUrl(pattern)) {
                return site;
            }
        }
    }
    throw new Error('jews don\'t support this site');
};

export function jewsable() {
    return window.location.search.indexOf('jews=false') < 0;
};

export default function jews(where=here()) {
    return require('./impl/' + where)();
};

if (process.env.JEWS === 'test') {
    require('electron').ipcRenderer.send('test', 'test async');
    require('electron').ipcRenderer.sendSync('test', 'test sync');
}

if (require.main === module) {
    (async () => {
        if (!jewsable()) {
            if (process.env.JEWS === 'test') {
                require('electron').ipcRenderer.sendSync('jews-error', new Error('not jewsable'));
            }
            return;
        }
        try {
            await waitWhilePageIsLoading();
            reconstruct(await jews());
        } catch (e) {
            console.error(e ? (e.stack || e) : e);
            if (process.env.JEWS === 'test') {
                require('electron').ipcRenderer.sendSync('jews-error', e);
            }
            return;
        }
        if (process.env.JEWS === 'test') {
            require('electron').ipcRenderer.sendSync('jews-done');
        }
    })();
}
