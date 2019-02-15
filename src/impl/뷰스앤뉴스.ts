import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Article {
    return {
        title: $('#ArticleVTitle').text(),
        subtitle: $('#ArticleVSubject').text(),
        content: (() => {
            const newsContent = $('#ArticleVContent')[0].cloneNode(true);
            $('#ArticleVAdvert', newsContent).remove();
            return clearStyles(newsContent).innerHTML;
        })(),
        timestamp: {
            created: new Date($('#ArticleVDate').text().trim().replace(/-/g, '/')),
            lastModified: undefined
        },
        reporters: (() => {
            const reporters = $('#ArticleVName')[0].cloneNode(true);
            $('.goTop', reporters).remove();
            return [{
                name: clearStyles(reporters).innerHTML,
                mail: undefined
            }];
        })()
    };
}
