import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('#articleWrap h2').text() || $('#articleWrap h1').text() || undefined,
        subtitle: $('.article .stit strong b').text() || undefined,
        content: (() => {
            const content = $('.article')[0].cloneNode(true);
            $('.stit, .banner-0-wrap, .article_ban, .adrs, .article-ad-box', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date($('.article .adrs .pblsh').text().replace(/\s*송고/, '')),
            lastModified: undefined
        },
        reporters: []
    };
}
