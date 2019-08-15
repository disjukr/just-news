import * as $ from 'jquery';
import * as moment from 'moment';

import {
    Article,
    ReadyToParse,
} from '..';
import {
	clearStyles,
	parseTimestamp,
} from '../util';


export const readyToParse: ReadyToParse = wait => wait('.grid_c');

export const cleanup = () => $('.pushADMiddle').remove();

export function parse(): Article {
    const articleBodyElement = $('.txt_news')[0].cloneNode(true) as HTMLElement;
    return {
        title: $('.subject').text(),
        content: (() => {
            { // 광고
                $('a[title="advertise"]', articleBodyElement).remove();
                $('.article_bottom_ad', articleBodyElement).remove();
            }
            return clearStyles(articleBodyElement).innerHTML;
        })(),
        timestamp: parseTimestamp($('.author').text()),
        reporters: (() => {
            const d = /([^<]*?) 기자 ?([^>]*)/.exec(
                $('.reporter').text()
            );
            return [{
                name: d![1],
                mail: d![2],
            }];
        })(),
    };
}
