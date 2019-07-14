import * as $ from 'jquery';

import {
    Article,
    ReadyToParse,
} from '..';
import {
    clearStyles,
    parseTimestamp,
} from '../util';


export const readyToParse: ReadyToParse = wait => wait('#SG_CreatorEmail');

export function parse(): Article {
    return {
        title: $('#title_sns .newViewTitle').text(),
        subtitle: $('.subject h2').html(),
        content: (() => {
            const articleElement = $('.view_middleNews #article_txt')[0].cloneNode(true) as HTMLElement;
            $('p > iframe[src*=ad]', articleElement).remove();
            $('p', articleElement).filter((_, el) => !$(el).text().trim()).remove();
            return clearStyles(articleElement).innerHTML;
        })(),
        timestamp: parseTimestamp($('.article_head .clearfx .data').text()),
        reporters: (() => {
            const name = $('#SG_CreatorName').text();
            const mail = $('#SG_CreatorEmail').text();
            return [{ name, mail }];
        })(),
    };
}
