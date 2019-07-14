import * as $ from 'jquery';

import {
    Article,
    ReadyToParse,
} from '..';
import {
    clearStyles,
    parseTimestamp,
} from '../util';


export const readyToParse: ReadyToParse = wait => wait('.copyright');

export function parse(): Article {
    return {
        title: $('#article_title').text(),
        content: (() => {
            const articleBodyElement = $('#articleBody')[0].cloneNode(true) as HTMLElement;
            $('.article_bottom_ad', articleBodyElement).remove();
            return clearStyles(articleBodyElement).innerHTML;
        })(),
        timestamp: parseTimestamp($('.byline').text()),
        reporters: (() => {
            const bylineText = $('.info_byline').text().trim();
            const d = /(.*?) 기자 ?(.*)/.exec(bylineText);
            return [{
                name: d![1],
                mail: d![2],
            }];
        })(),
    };
}
