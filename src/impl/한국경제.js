import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.news_sbj_h').text();
    jews.subtitle = $('.article_stit').text().trim();
    var content = $($('#newsView')[0].cloneNode(true));
    $('.article_stit, .article_aside_group, .ico_imgMore', content).remove();
    jews.content = clearStyles(content[0]).innerHTML;
    jews.timestamp = (function () {
        var parsedData = $('.news_info').children();
        function parseDate(s) {
            return new Date(s.replace(/-/g, '/').replace(/[가-힣]/g, '').replace(/^\s+/g, ''));
        }
        return {
            created: parseDate(parsedData.eq(0).text()),
            lastModified: parseDate(parsedData.eq(1).text())
        };
    })();
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv, iframe').remove();
    };
    return jews;
}
