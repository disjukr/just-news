import style from './style';
import Article from './Article';

const noReconstructQueryKey = 'just_news';

export function reconstructable(): boolean {
    const { search } = window.location;

    return search.indexOf(`${ noReconstructQueryKey }=false`) < 0;
}

export function noReconstructUrl(): string {
    let {
        search: query,
        origin,
        pathname
    } = window.location;

    if (query.length) {
        query += `&${ noReconstructQueryKey }=false`;
    } else {
        query = `?${ noReconstructQueryKey }=false`;
    }

    return origin + pathname + query;
}

export function reconstruct(article: Article): void {
    // timeout, interval 청소
    let id = window.setTimeout('0', 0);

    while (id--) {
        window.clearTimeout(id);
        window.clearInterval(id);
    }

    // hack: popup 창 못 띄우게 만들기
    window.open = function () {};

    // cleanup
    if (typeof article.cleanup === 'function') {
        window.setInterval(article.cleanup, 1000);
    }

    // reconstruct
    const root = document.createElement('html');
    document.replaceChild(root, document.documentElement);
    root.innerHTML = `
<head>
    <title>${ article.title || 'just-news' }</title>
    <meta charset="utf-8">
    ${ style }
</head>
<body>
    <div id="info">
        <small>
            <a href="https://github.com/disjukr/just-news">just-news</a>에 의해 변환된 페이지입니다.
            <a href="${ noReconstructUrl() }">원본 페이지 보기</a>
        </small>
    </div>
    <h1>${ article.title || 'no title' }</h1>
    ${ (!!article.subtitle) ? `<h2>${ article.subtitle }</h2>` : '' }
    <div id="meta">
        <div id="timestamp">
        ${(() => {
            let result = '';
            const timestamp = article.timestamp;

            if (!timestamp) {
                return result;
            }

            const { created, lastModified } = timestamp;

            if (created) {
                result += (isNaN(created.getTime()))
                    ? `<p>잘못된 작성일</p>`
                    : `<p> 작성일: <time datetime="${ created.toISOString() }" class="created"></time>
                        ${ created.toLocaleString ? created.toLocaleString() : created.toDateString() }
                        </p>`;
            }

            if (lastModified) {
                result += (isNaN(lastModified.getTime()))
                    ? `<p>잘못된 마지막 수정일</p>`
                    : `<p>마지막 수정일: <time datetime="${ lastModified.toISOString() }" class="last-modified"></time>
                        ${ lastModified.toLocaleString ? lastModified.toLocaleString() : lastModified.toDateString() }
                        </p>`;
            }

            return result;
        })()}
        </div>
        <ul id="reporters">
        ${ article.reporters && article.reporters.map(reporter => {
            const result = [`<li>`];

            if (!!reporter.name) result.push(`<span class="name">${ reporter.name }</span>`);
            if (!!reporter.mail) result.push(`<span class="mail">${ reporter.mail }</span>`);

            result.push(`</li>`);

            return result.join('');
        }).join('') || '' }
        </ul>
    </div><br>
    <div id="content">${ article.content || 'empty' }</div>
</body>`;
}
