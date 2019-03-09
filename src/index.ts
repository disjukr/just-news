import sites from './sites';
import {
    reconstruct,
    reconstructable,
} from './reconstruct';
import {
    waitDOMContentLoaded,
    endlessWaiting,
} from './util';


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

const escapeRegExp = require('lodash.escaperegexp');
export function checkUrl(pattern: string, url=window.location.href) {
    return (new RegExp(
        escapeRegExp(pattern).replace(/\\\*/g, '.*')
    )).test(url.substr(url.indexOf(':') + 1));
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

async function main() {
    if (!reconstructable()) return;
    try {
        const where = here();
        const impl = require('./impl/' + where);
        await Promise.race([
            impl.readyToParse ? impl.readyToParse() : endlessWaiting,
            waitDOMContentLoaded(),
        ]);
        const article =
            impl.parse ? await impl.parse() as Article :
            impl.default ? await impl.default() as Article :
            null;
        if (article == null) throw new Error('구현된 파싱 함수가 없습니다.');
        reconstruct(article, impl.cleanup || article.cleanup);
    } catch (e) {
        console.error(e ? (e.stack || e) : e);
    }
}

main();
