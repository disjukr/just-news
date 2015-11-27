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


if (require.main === module) {
    (async function () {
        // 다음과 같은 비교구문은 production 빌드에서 자동으로 제거됩니다.
        if (process.env.JEWS === 'test') {
            var ipc = eval(`require('electron')`).ipcRenderer;
        }
        if (!jewsable()) {
            if (process.env.JEWS === 'test') {
                ipc.sendSync('jews-error', 'not jewsable');
            }
            return;
        }
        let jewsResult;
        try {
            await waitWhilePageIsLoading();
            jewsResult = await jews();
            reconstruct(jewsResult);
        } catch (e) {
            let err = e ? (e.stack || e) : e;
            console.error(err);
            if (process.env.JEWS === 'test') {
                ipc.sendSync('jews-error', err + '');
            }
            return;
        }
        if (process.env.JEWS === 'test') {
            // ipc를 통할 때는 Date 등의 객체가 제대로 전달되지 않으므로
            // builtin type으로 변환해야합니다. 예) Date -> string
            ipc.sendSync('jews-done', {
                title: jewsResult.title,
                subtitle: jewsResult.subtitle,
                content: jewsResult.content,
                timestamp: (t => {
                    if (!t) return void 0;
                    return {
                        created: t.created ? t.created + '' : void 0,
                        lastModified: t.lastModified ? t.lastModified + '' : void 0
                    };
                })(jewsResult.timestamp),
                reporters: jewsResult.reporters
            });
        }
    })();
}
