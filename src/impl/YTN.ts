import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    const created = (() => {
        try {
            const createdText = $('#zone1 > .top .li_1 > .time').text();
            const arr = /(\d{4}).+?(\d{2}).+?(\d{2}).+?(\d{2}).+?(\d{2}).+/.exec(createdText)!;
            const [, yyyy, MM, dd, HH, mm] = arr.map(Number);
            return new Date(yyyy, MM - 1, dd, HH, mm);
        } catch {
            return;
        }
    })();
    return {
        title: $('#zone1 > .top h3').text(),
        content: (() => {
            const ytnPlayerHtml = $('#YTN_Player').html() || '';
            const content = $('#zone1 .content .article')[0].cloneNode(true);
            $('.ad_box, .txtad', content).remove();
            $('.hns_mask_div', content).remove();
            return ytnPlayerHtml + clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created,
            lastModified: undefined
        },
        reporters: [],
    };
}
