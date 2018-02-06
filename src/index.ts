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
        const impl = require('./impl/' + where);
        if (impl.parse) return impl.parse();
        if (impl.default) return impl.default();
        throw new Error('구현된 파싱 함수가 없습니다.');
    }).then(
        article => reconstruct(article)
    ).catch(e => {
        let err = e ? (e.stack || e) : e;
        console.error(err);
    });
}
