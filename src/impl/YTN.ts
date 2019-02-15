import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Article {
    return {
        title: $('.article_tit').text(),
        content: (() => {
            let content = $('.article_wrap')[0].cloneNode(true);
            $('.news_slide, .articleAd_new, .hns_mask_div', content).remove();
            $('.playbt', content).remove();
            $('.bt_vodinfo', content).remove();
            $('.share_btns', content).remove();
            $('.copyright', content).remove();
            $('div:last-child', content).remove();
            $('div[id^=float]', content).remove();
            $('#iwm_float', content).remove();

            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: $('.extra_info').length ? new Date($('.extra_info').text().trim().replace('Posted : ', '').replace(/-/g, '/')) : undefined,
            lastModified: undefined
        },
        reporters: [],
        cleanup: () => {
            $('#scrollDiv, #content style').remove();
            $('.dklink').each((_, link) => {
                $(link).replaceWith($(link).text());
            });
            $('.imgArea > img').each((_, item) => {
                var src = $(item).data('src');
                if (typeof src !== 'undefined') {
                    $(item).attr('src', src);
                }
            });
            $('.extra_info').remove();
        }
    };
}
