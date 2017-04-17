import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#article_title').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('.art_body')[0].cloneNode(true);
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor)[0].innerHTML);
        });
        $('#article_bottom_ad, #divBox', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.art_header .byline').contents();
        return {
            created: new Date(parsedData.eq(1).text().replace(/입력\s*:/, '').replace(/\./g, '/')),
            lastModified: new Date(parsedData.eq(3).text().replace(/수정\s*:/, '').replace(/\./g, '/'))
        };
    })();
    jews.reporters = (function () {
        var parsedData = $('.subject .name').text().trim().split(/\s+/);
        return [{
            name: parsedData[0],
            mail: parsedData[2] || undefined
        }];
    })();
    jews.cleanup = (function () {
        $('.article_bottom_ad').remove();
        $('.iwmads-wrapper').remove();
        $('#pscroller2.someclass').remove();
        $('#ILSA_obj').remove();
    })();
    return jews;
}
