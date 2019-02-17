import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    $('iframe, #gnb_banner, .article_ad250').remove();
}

export function parse(): Article {
    return {
        title: $('#sTitle_a').text(),
        subtitle: $('#articletitle .title h4').text().trim() || undefined,
        content: (() => {
            const content = $('#articlebody')[0].cloneNode(true);
            $('#divArticleBottomTextBannerInline, .article_middle_ad', content).remove();
            $('table', content).each(function (i, v) {
                v.removeAttribute('width');
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date($('.date').text()),
            lastModified: undefined
        },
        reporters: []
    };
}
