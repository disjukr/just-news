const sites = require('./sites').default;

// http://wiki.greasespot.net/Metadata_Block
exports.__esModule = true;
exports.default = `// ==UserScript==
// @name jews
// @namespace http://0xABCDEF.com/jews
// @description just news
// @version ${ (new Date).toISOString().substr(0, 10) }
// @updateURL https://github.com/disjukr/jews/raw/release/dist/jews.user.js
// @downloadURL https://github.com/disjukr/jews/raw/release/dist/jews.user.js
// @copyright 2014 JongChan Choi
// @grant none
${
    Object.keys(sites).map(
        site => sites[site].map(
            pattern => `// @include ${ pattern }`
        ).join('\n')
    ).join('\n')
}
// ==/UserScript==`;
