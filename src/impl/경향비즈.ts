import * as $ from 'jquery';
import * as moment from 'moment';

import {
    Article,
} from '..';
import {
    clearStyles,
    waitElement,
} from '../util';


export const readyToParse = () => waitElement('#adtive');

export function parse(): Article {
    const articleBodyElement = $('.art_cont')[0].cloneNode(true);
    return {
        title: $('#articleTtitle').text(),
        subtitle: $('.art_subtit', articleBodyElement).text(),
        content: (() => {
            { // 부제목
                $('.art_subtit', articleBodyElement).remove();
            }
            { // 이상한 것들
                $('#adtive', articleBodyElement).nextAll().remove();
                $('#adtive', articleBodyElement).remove();
            }
            { // 광고
                $('.article_bottom_ad, .iwmads-wrapper #divBox', articleBodyElement).remove();
            }
            return clearStyles(articleBodyElement).innerHTML;
        })(),
        timestamp: (() => {
            const times = $('#bylineArea em');
            const format = 'YYYY.MM.DD HH:mm:ss';
            const parse = (text: string) => moment(text.replace(/.*?:\s*/, ''), format);
            return {
                created: parse(times.eq(0).text()).toDate(),
                lastModified: times[1] && parse(times.eq(1).text()).toDate(),
            };
        })(),
        reporters: (() => {
            const d = /(.*?) 기자 ?(.*)/.exec($('.view_header .subject .name').text());
            return [{
                name: d![1],
                mail: d![2],
            }];
        })(),
        cleanup: () => $('#scrollDiv, iframe').remove(),
    };
}
