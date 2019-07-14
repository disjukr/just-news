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
    reconstruct(article.title || 'just-news');
    for (const cssText of window.lazyStyles) {
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.appendChild(document.createTextNode(cssText));
        document.head.appendChild(style);
    }
    render(
        h(Article, {
            optOutUrl: optOutUrl(),
            ...article,
        }),
        document.body,
    );
    {
        const { runAfterReconstruct, cleanup } = impl;
        if (runAfterReconstruct) window.setTimeout(runAfterReconstruct, 100);
        if (cleanup) window.setInterval(cleanup, 1000);
    }
}
main().catch(e => console.error(e ? (e.stack || e) : e));
