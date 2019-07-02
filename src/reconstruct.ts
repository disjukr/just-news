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
    <style>
    @import url(https://fonts.googleapis.com/earlyaccess/nanummyeongjo.css);
    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 60vh;
        text-align: center;
    }
    #info {
        margin-bottom: 20px;
        color: #666;
    }
    #title {
        margin-top: 20px;
        margin-bottom: 40px;
    }
    #sub-title {
        margin-top: -20px;
        margin-bottom: 40px;
    }
    #meta {
        display: inline-block;
        width: 640px;
        max-width: calc(100% - 40px);
    }
    #timestamp {
        color: #888;
        font-size: 10pt;
        text-align: left;
    }
    #timestamp p {
        margin: 0;
    }
    #reporters {
        list-style-type: none;
        text-align: right;
    }
    #reporters .mail {
        margin-left: 8px;
    }
    #content {
        display: inline-block;
        width: 640px;
        max-width: calc(100% - 40px);
        font-family: 'Nanum Myeongjo', serif;
        font-size: 11pt;
        text-align: justify;
        line-height: 1.6;
    }
    #content img {
        display: block;
        margin: 15px auto;
        max-width: 100%;
        height: auto;
    }
    </style>
</head>
<body>
</body>`;
}
