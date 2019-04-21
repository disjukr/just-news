import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('.article_title').text() || undefined,
        content: (() => {
            const content = $('.article_body')[0].cloneNode(true);
            $('.article_ad', content).remove();
            $('.ad_newsviewWrap', content).remove();
            $('#BpromotionBanner', content).remove();
            $('.ad, .footer_btnwrap, img[src^="http://img.etnews.com/2017/banner/"], *[src^="http://adv"]', content).remove();
            $('.daum_ddn_area, [id^=beacon]', content).remove();
            $('.a_ict_word', content).each(function (i, el) {
                $(el).replaceWith($('.ict_word', el).text());
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date($('time').text().replace('발행일 : ', '').replace(/\./g, '/')),
            lastModified: undefined
        },
        reporters: []
    };
}
