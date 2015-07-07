import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#sTitle_a').text();
    jews.subtitle = $('#articletitle .title h4').text().trim() || undefined;
    jews.content = (function () {
        var content = $('#articlebody')[0].cloneNode(true);
        $('#divArticleBottomTextBannerInline, .article_middle_ad', content).remove();
        $('table', content).each(function (i, v) {
            v.removeAttribute('width');
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.date').text()),
        lastModified: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('iframe, #gnb_banner, .article_ad250').remove();
    };
    return jews;
}
