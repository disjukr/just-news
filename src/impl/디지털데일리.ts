import * as $ from 'jquery';
import {
    clearStyles,
    waitElement,
} from '../util';
import { Article } from '..';

export const readyToParse = () => waitElement('#body_bn');

export const cleanup = () => {
    $('body>iframe, #fb-root').remove();
}

export function parse(): Article {
    const meta = $('.arvdate').text().trim();
    const metaRegexp = /^(\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}:\d{2})\s+\/\s+(.*?)\s+(.*)$/;
    const match = metaRegexp.exec(meta);
    return {
        title: $('.arvtitle .hbox h2').text().trim(),
        subtitle: undefined,
        content: clearStyles($('#news_body_area')[0].cloneNode(true)).innerHTML,
        timestamp: {
            created: match ? new Date(match[1].replace(/\./g, '-').replace(/\s+/, 'T') + '+09:00') : undefined,
            lastModified: undefined
        },
        reporters: [{
            name: match ? match[2] : undefined,
            mail: match ? match[3] : undefined
        }]
    };
}
