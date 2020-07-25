import { $, $$, remove, text } from '../dom';

import {
    Article,
    ReadyToParse,
} from '..';
import {
    clearStyles,
    parseTimestamp,
} from '../util';


export const readyToParse: ReadyToParse = wait => wait('.group_cont_etc');

// export const cleanup = () => remove($$('.pushADMiddle'));

export function parse(): Article {
    const articleBodyElement = $('#artCont')!.cloneNode(true) as HTMLElement;
    const infoView = remove($('.info_view', articleBodyElement))!;
    return {
        title: text($('.tit_view')),
        content: (() => {
            { // 광고
                remove($$('a[title="advertise"]', articleBodyElement));
                remove($$('.article_bottom_ad', articleBodyElement));
            }
            return clearStyles(articleBodyElement).innerHTML;
        })(),
        timestamp: parseTimestamp(text($('.txt_info', infoView))),
        reporters: [{ name: text($('.author', infoView)) }],
    };
}
