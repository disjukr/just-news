import $ from 'jquery';

import {
    Article,
    ReadyToParse,
} from '..';
import {
    clearStyles,
} from '../util';


export const readyToParse: ReadyToParse = wait => wait('#articleBody');

export function parse(): Article {
    const $info = $('#head-info .info');
    return {
        title: $('.headline-title').text(),
        subtitle: $('.headline-sub').text(),
        content: (() => {
            const $articleBody = $('#articleBody')[0].cloneNode(true) as HTMLElement;
            $('[id^=mobonDivBanner]', $articleBody).remove();
            return clearStyles($articleBody).innerHTML;
        })(),
        timestamp: (() => {
            const infoText = $info.text();
            const parsedText = /(\d{4})\.(\d{2})\.(\d{2}) (\d{2}:\d{2})/.exec(infoText)!;
            if (!parsedText) return {};
            const [, yyyy, mm, dd, t] = parsedText;
            const created = new Date(`${yyyy}-${mm}-${dd}T${t}:00`);
            return { created };
        })(),
        reporters: [{
            name: $('#head-info .info .info-txt').eq(0).text(),
        }],
    };
}
