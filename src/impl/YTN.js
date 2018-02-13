import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.article_tit').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('.article_wrap')[0].cloneNode(true);
        $('.news_slide, .articleAd_new, .hns_mask_div', content).remove();
        $('.playbt', content).remove();
        $('.bt_vodinfo', content).remove();
        $('.share_btns', content).remove();
        $('.copyright', content).remove();
        $('div:last-child', content).remove();
        $('div[id^=float]', content).remove();
        $('#iwm_float', content).remove();

        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: $('.extra_info').length ? new Date($('.extra_info').text().trim().replace('Posted : ', '').replace(/-/g, '/')) : undefined,
        lastModified: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv, #content style').remove();
        $('.dklink').each(function (_, link) {
            $(link).replaceWith($(link).text());
        });
        $('.imgArea > img').each(function (index, item) {
            var src = $(item).data('src');
            if (typeof src !== 'undefined') {
                $(item).attr('src', src);
            }
        });
        $('.extra_info').remove();
    };
    return jews;
}
