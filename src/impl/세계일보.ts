import * as $ from 'jquery';

import {
    Article,
    ReadyToParse,
} from '..';
import {
    clearStyles,
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
        timestamp: (() => {
            const timestamp: Article['timestamp'] = {};
            const datesText = $('.article_head .clearfx .data').text();
            const [createdText, lastModifiedText] = matchAll(datesText, /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})/g);
            if (createdText) timestamp.created = new Date(`${createdText[1]}T${createdText[2]}`);
            if (lastModifiedText) timestamp.lastModified = new Date(`${lastModifiedText[1]}T${lastModifiedText[2]}`);
            return timestamp;
        })(),
        reporters: (() => {
            const name = $('#SG_CreatorName').text();
            const mail = $('#SG_CreatorEmail').text();
            return [{ name, mail }];
        })(),
    };
}

function matchAll(text: string, regex: RegExp) {
    const result = [];
    let match;
    do {
        match = regex.exec(text);
        if (match) result.push(match);
    } while (match);
    return result;
}
