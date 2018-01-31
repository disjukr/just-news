import sites from './sites';
import {
    reconstruct,
    reconstructable,
} from './reconstruct';

export interface Timestamp {
    created?: Nullable<Date>;
    lastModified?: Nullable<Date>;
}

export interface Reporter {
    name?: Nullable<string>;
    mail?: Nullable<string>;
}

export interface Article {
    title?: Nullable<string>;
    subtitle?: Nullable<string>;
    content?: Nullable<string>;
    timestamp?: Nullable<Timestamp>;
    reporters?: Nullable<Reporter[]>;
    cleanup?: Nullable<() => void>;
}

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

const escapeRegExp = require('lodash.escaperegexp');
export function checkUrl(pattern: string, url=window.location.href) {
    return (new RegExp(
        escapeRegExp(pattern).replace(/\\\*/g, '.*')
    )).test(url);
};

export function here() {
    for (let site in sites) {
        for (let pattern of sites[site as keyof typeof sites]) {
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
    waitWhilePageIsLoading().then(() => {
        const where = here();
        return require('./impl/' + where).default();
    }).then(
        article => reconstruct(article)
    ).catch(e => {
        let err = e ? (e.stack || e) : e;
        console.error(err);
    });
}
