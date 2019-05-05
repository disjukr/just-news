import codegen from 'codegen.macro';

import * as router from './router';
import {
    waitDOMContentLoaded,
    waitForSelector,
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
}

export interface WaitForSelector { (selector: string): Promise<void>; }
export interface ReadyToParse { (waitForSelector: WaitForSelector): Promise<void>; }

export interface Impl {
    parse: () => Article;
    readyToParse?: Nullable<ReadyToParse>;
    cleanup?: Nullable<() => void>;
}

export function toJSON(article: Article): object | null {
    if (!article || typeof article !== 'object') return null;
    const any2str = (date: any) => date instanceof Date ? date2str(date) : null;
    const date2str = (date: Date) => isNaN(+date) ? 'Invalid Date' : date.toISOString();
    return {
        ...article,
        timestamp: article.timestamp ? {
            created: any2str(article.timestamp.created),
            lastModified: any2str(article.timestamp.lastModified),
        } : {},
    };
}

export function fromJSON(article: any): Article | null {
    if (!article || typeof article !== 'object') return null;
    const any2date = (date: any) => typeof date === 'string' ? str2date(date) : null;
    const str2date = (date: string) => (date === 'Invalid Date') ? new Date(NaN) : new Date(date);
    return {
        ...article,
        timestamp: article.timestamp ? {
            created: any2date(article.timestamp.created),
            lastModified: any2date(article.timestamp.lastModified),
        } : {},
    };
}

export function here(url=location.href) {
    if (!here.routeTree) {
        here.routeTree = codegen<router.Node[]>`
            const sites = require('./sites').default;
            const router = require('./router');
            module.exports = router.stringify(
                router.bake(sites),
                'router.Node',
                'router.Wildcard',
            );
        `;
    }
    const site = router.match(url.substr(url.indexOf('://') + 3), here.routeTree);
    if (!site) throw new Error('이 사이트는 지원되지 않습니다.');
    return site;
};
here.routeTree = null as router.Node[] | null;

export function getImpl(where=here()): Impl {
    return require('./impl/' + where);
}

export async function coreProcess(impl=getImpl()): Promise<[Article, Impl]> {
    await Promise.race([
        impl.readyToParse ? impl.readyToParse(waitForSelector) : endlessWaiting,
        waitDOMContentLoaded(),
    ]);
    return [await impl.parse() as Article, impl];
}
