import * as $ from 'jquery';

import {
    Article,
    ReadyToParse,
} from '..';
import {
	clearStyles,
	parseTimestamp,
} from '../util';


export const readyToParse: ReadyToParse = wait => wait('#articleBody');

export const cleanup = () => $('#scrollDiv, iframe').remove();

export function parse(): Article {
    const articleBodyElement = $('.art_cont')[0].cloneNode(true) as HTMLElement;
    return {
        // `biz.khan.co.kr`일 경우 `#articleTtitle`
        // `news.khan.co.kr`일 경우 `#article_title`
        title: $('#articleTtitle, #article_title').text(),
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
        timestamp: parseTimestamp($('.byline em').text()),
        reporters: (() => {
            const d = /(.*?) 기자 ?(.*)/.exec(
                // `biz.khan.co.kr`일 경우 `.view_header`
                // `news.khan.co.kr`일 경우 `.art_header`
                $('.view_header, .art_header').find('.subject .name').text()
            );
            return [{
                name: d![1],
                mail: d![2],
            }];
        })(),
    };
}
