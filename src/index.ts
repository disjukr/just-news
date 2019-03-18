import codegen from 'codegen.macro';

import * as router from './router';
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

const routeTree = codegen<router.Node[]>`
    const sites = require('./sites').default;
    const router = require('./router');
    module.exports = router.stringify(
        router.bake(sites),
        'router.Node',
        'router.Wildcard',
    );
`;
export function here(url=location.href) {
    const site = router.match(url.substr(url.indexOf('://') + 3), routeTree);
    if (!site) throw new Error('이 사이트는 지원되지 않습니다.');
    return site;
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
