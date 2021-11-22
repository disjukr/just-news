import $ from 'jquery';

import {
    Article,
    ReadyToParse,
} from '..';
import {
    clearStyles,
    parseTimestamp,
} from '../util';

export const readyToParse: ReadyToParse = wait => wait('.best_nw');

// 유투브 동영상(iframe)이 포함된 기사: http://news.kmib.co.kr/article/view.asp?arcid=0012123329&code=61161111&sid1=spo
// 따라서 단순하게 iframe을 날려버리면 기사 내용이 날라가는 문제가 있을 수 있습니다.
export const cleanup = () => $('#scrollDiv, body>script, body>iframe, #NeoInteractiveScreenViewLayer, body>div:not([id])').remove();

export function parse(): Article {
    return {
        title: $('.nwsti h3').text(),
        content: (() => {
            const article = $('#articleBody')[0].cloneNode(true) as HTMLElement;
            $('a[href^="http://news.kmib.co.kr/article/fbchoice/index.asp"]', article).remove();
            $('a[href^="http://www.kmib.co.kr/photo/index.asp"]', article).remove();
            $('a[href^="http://www.kmib.co.kr/vod/index.asp"]', article).remove();
            const nodes = article.childNodes;
            const blankRegexp = /^\s*$/;
            for (let i = nodes.length - 1; i >= 0; i--) {
                if (!(nodes[i].nodeType === 3
                    && !blankRegexp.test(nodes[i].nodeValue))
                || !(nodes[i].nodeType === 1 
                    && (nodes[i].nodeName === 'BR' || nodes[i].nodeName === 'FONT'))) {
                    break;
                }
                article.removeChild(nodes[i]);
            }
            return clearStyles(article).innerHTML;
        })(),
        // 입력, 수정 둘 다 있는 기사: http://news.kmib.co.kr/article/view.asp?arcid=0012123329&code=61161111&sid1=spo
        timestamp: parseTimestamp($('.nwsti_btm .date .t11').text()),
    };
}
