import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article, ReadyToParse } from '..';

export const cleanup = () => {
    $('#scrollDiv, iframe').remove();
}

export const readyToParse: ReadyToParse = wait => wait('.article_btm_box');

export function parse(): Article {
    return {
        title: $('h1.title').text(),
        subtitle: $('.article_stit').text().trim(),
        content: (() => {
            const content = $($('#newsView')[0].cloneNode(true));
            $('.article_stit, .article_aside_group, .ico_imgMore, .box_related_list', content).remove();
            return clearStyles(content[0]).innerHTML;
        })(),
        timestamp: (() => {
            let created: any = $('.date-published .num').text().trim().replace(/\./g, "-").replace(/\s+/, "T")
            let lastModified: any = $('.date-modify .num').text().trim().replace(/\./g, "-").replace(/\s+/, "T")

            return {
                created: new Date(created),
                lastModified: new Date(lastModified)
            };
        })(),
        reporters: []
    };
}
