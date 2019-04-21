import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('.txtBox h4 a').text().trim(),
        content: (() => {
            const content = $('.articleSingle')[0].cloneNode(true);
            $('.txtBox', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const time_info = $('.txtBox h6').text().trim();
            return {
                created: new Date(time_info.replace('기사입력 : ', '')),
                lastModified: undefined
            };
        })(),
        reporters: []
    };
}
