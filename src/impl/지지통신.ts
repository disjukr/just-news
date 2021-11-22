import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('iframe, [id^=goog], [id^=popIn_menu]').remove();
}

export function parse(): Article {
    return {
        title: $('#article-title').text(),
        subtitle: undefined,
        content: clearStyles($('#article-body')[0].cloneNode(true)).innerHTML,
        timestamp: {
            created: undefined,
            lastModified: undefined
        },
        reporters: []
    };
}
