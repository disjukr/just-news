import {
    Article,
} from '.';


const optOutQueryKey = 'just_news';

export function isOptOut() {
    return window.location.search.indexOf(`${ optOutQueryKey }=false`) !== -1;
}

export function optOutUrl() {
    let query = window.location.search;
    if (query) {
        query += `&${ optOutQueryKey }=false`;
    } else {
        query = `?${ optOutQueryKey }=false`;
    }
    return window.location.origin + window.location.pathname + query;
}

export function reconstruct(article: Article, cleanup?: Nullable<() => void>) {
    { // timeout, interval 청소
        let id = window.setTimeout('0', 0);
        while (id--) {
            window.clearTimeout(id);
            window.clearInterval(id);
        }
    }
    { // popup 창 못 띄우게 만들기
        window.open = () => null;
    }
    { // cleanup
        if (cleanup) window.setInterval(cleanup, 1000);
    }
    let root = document.createElement('html');
    document.replaceChild(root, document.documentElement);
    root.innerHTML = `
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <title>${ article.title || 'just-news' }</title>
</head>
<body>
</body>`;
}
