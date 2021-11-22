import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('span, iframe, #wp_adbn_root, #scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('.viewtitle').text(),
        content: (() => {
            const content = $('.article')[0].cloneNode(true);
            $('span[style="margin-top:30px; float:right;padding-right:1px;margin-left:5px;display:inline;z-index:1;"]', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const time_info = $('.dateWrap li .date');
            return {
                // ISO 8601
                created: new Date(time_info[0].innerHTML.split(' ').join('T') + '+09:00'),
                lastModified: new Date(time_info[1].innerHTML.split(' ').join('T') + '+09:00')
            };
        })(),
        reporters: []

    };
}
