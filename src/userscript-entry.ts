import { h, render } from 'preact';

import { coreProcess } from '.';
import {
    reconstruct,
    isOptOut,
    optOutUrl,
} from './reconstruct';
import Article from './view/Article';
import './view/index.css';

async function main() {
    if (isOptOut()) return;
    const [article, impl] = await coreProcess();
    reconstruct(article, impl.cleanup);
    render(
        h(Article, {
            optOutUrl: optOutUrl(),
            title: article.title || void 0,
            subtitle: article.subtitle || void 0,
            timestamp: article.timestamp ? {
                created: article.timestamp.created || void 0,
                lastModified: article.timestamp.lastModified || void 0,
            } : void 0,
            reporters: article.reporters ?
                article.reporters.map(reporter => ({
                    name: reporter.name || void 0,
                    mail: reporter.mail || void 0,
                })) : void 0,
            content: article.content || void 0,
        }),
        document.body,
    );
}
main().catch(e => console.error(e ? (e.stack || e) : e));
