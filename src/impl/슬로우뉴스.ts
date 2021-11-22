import $ from 'jquery';
import {
    clearStyles,
} from '../util';
import {
    Article,
    ReadyToParse,
} from '..';

export const readyToParse: ReadyToParse = wait => wait('.social_follow');

export const cleanup = () => {
    $('#fb-root, body>iframe').remove();
}

export function parse(): Article {
    return {
        title: $('.cat_article_title').text(),
        subtitle: undefined,
        content: (() => {
            const content = $($('#article_content')[0].cloneNode(true));
            $('.async-wrapper, #wpdevar_comment_1, .clear', content).remove();
            return clearStyles(content[0]).innerHTML;
        })(),
        timestamp: {
            created: new Date($('.meta_date a strong').text().replace(/-/g, '/')),
            lastModified: undefined
        },
        reporters: [{
            name: $('.meta_author a[rel="author"]').text(),
            mail: undefined
        }]
    };
}
