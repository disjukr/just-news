import $ from 'jquery';

import {
    Article,
    ReadyToParse,
} from '..';
import {
    clearStyles,
    parseTimestamp,
    getQueryParam,
} from '../util';


export const readyToParse: ReadyToParse = wait => wait('.sns_area');

// 사이드바 후처리
export const cleanup = () => $('#sidr').remove();

export function parse(): Article {
    const articleBodyElement = $('#article_content_area')[0].cloneNode(true) as HTMLElement;
    return {
        title: $('.artical_hd > h3').text(),
        content: (() => {
            { // 광고
                $('[id^=mobonDivBanner_]', articleBodyElement).remove();
            }
            return clearStyles(articleBodyElement).innerHTML;
        })(),
        timestamp: parseTimestamp($('.author').text()),
        canonicalUrl: `https://news.jtbc.joins.com/html/214/${getQueryParam('news_id')}.html`,
    };
}
