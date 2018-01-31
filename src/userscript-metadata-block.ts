import sites from './sites';

// http://wiki.greasespot.net/Metadata_Block
export default `// ==UserScript==
// @name just-news
// @namespace http://0xABCDEF.com/just-news
// @description just news
// @version ${ (new Date).toISOString().substr(0, 10).replace(/-/g, '') }
// @updateURL https://github.com/disjukr/just-news/raw/release/dist/just-news.user.js
// @downloadURL https://github.com/disjukr/just-news/raw/release/dist/just-news.user.js
// @copyright 2014 JongChan Choi
// @grant none
${
    Object.keys(sites).map(
        site => sites[site as keyof typeof sites].map(
            pattern => `// @include ${ pattern }`
        ).join('\n')
    ).join('\n')
}
// ==/UserScript==`;
