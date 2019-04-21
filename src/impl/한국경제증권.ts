import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#scrollDiv, iframe').remove();
}

export function parse(): Article {
    return {
        title: $('.news_sbj_h').text(),
        content: (() => {
            const content = $($('#newsView')[0].cloneNode(true));
            $('.article_stit, .article_aside_group, .ico_imgMore', content).remove();
            return clearStyles(content[0]).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = $('.news_info').children();
            const parseDate = (s: any) => {
                return new Date(s.replace(/-/g, '/').replace(/[가-힣]/g, '').replace(/^\s+/g, ''));
            }
            return {
                created: parseDate(parsedData.eq(0).text()),
                lastModified: parseDate(parsedData.eq(1).text())
            };
        })(),
        reporters: []
    };
}
