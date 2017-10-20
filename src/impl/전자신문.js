import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.article_title').text() || undefined;
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('.article_body')[0].cloneNode(true);
        $('.ad, .footer_btnwrap, img[src^="http://img.etnews.com/2017/banner/"], *[src^="http://adv"]', content).remove();
        $('.daum_ddn_area, [id^=beacon]', content).remove();
        $('.a_ict_word', content).each(function (i, el) {
            $(el).replaceWith($('.ict_word', el).text());
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.date').text().replace('발행일 : ', '').replace(/\./g, '/')),
        modefied: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
