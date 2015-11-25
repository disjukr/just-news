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
    (async () => {
        if (!jewsable()) return;
        try {
            await waitWhilePageIsLoading();
            reconstruct(await jews());
        } catch (e) {
            console.error(e ? (e.stack || e) : e);
        }
    })();
}
