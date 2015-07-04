import sites from './sites';
import moment from 'moment';

// http://wiki.greasespot.net/Metadata_Block
export default `// ==UserScript==
// @name jews
// @namespace http://0xABCDEF.com/jews
// @description just news
// @version ${ moment().format('YYYY-MM-DD') }
// @updateURL https://raw.githubusercontent.com/disjukr/jews/release/jews.user.js
// @downloadURL https://raw.githubusercontent.com/disjukr/jews/release/jews.user.js
// @copyright 2014 JongChan Choi
// @grant none
${
    Object.keys(sites).map(
        site => sites[site].map(
            pattern => `// @include ${ pattern }`
        ).join('\n')
    ).join('\n')
}
// ==/UserScript==
`;
