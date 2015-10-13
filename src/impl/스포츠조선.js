import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.acle_c h1').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('.news_text .article')[0].cloneNode(true);
        $('#divBox, .mask_div, .gisa_banner', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.acle_c .a_day').text().split('|');
        var created = new Date(parsedData[0].replace('기사입력', '').replace(/-/g, '/').trim());
        var lastModified = parsedData[1] ? new Date(parsedData[1].replace('최종수정', '').replace(/-/g, '/').trim()) : undefined;
        return {
            created: created,
            lastModified: lastModified
        };
    })();
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
