import 'regenerator-runtime/runtime';
import escapeRegExp from 'lodash.escaperegexp';

import sites from './sites';
import {
    reconstruct,
    reconstructable,
} from './reconstruct';


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
        escapeRegExp(pattern).replace(/\\\*/g, '.*')
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
    throw new Error('이 사이트는 지원되지 않습니다.');
};

main: {
    if (!reconstructable()) {
        break main;
    }
    waitWhilePageIsLoading(
        void 0,
    ).then(() => {
        const where = here();
        return require('./impl/' + where).default();
    }).then(
        article => reconstruct(article)
    ).catch(e => {
        let err = e ? (e.stack || e) : e;
        console.error(err);
    });
}
