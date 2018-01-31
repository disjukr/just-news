import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#reView h2').text().trim();
    jews.subtitle = undefined;
    jews.content = (function () {
        var image = $('#DivContents .img_review_ad')[0];
        var content = $('#DivContents .review_text02')[0].cloneNode(true);
        if (image !== undefined) {
            content.insertBefore(image.cloneNode(true), content.firstChild);
        }
        $('.ad_gigigi', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#reView p').contents().eq(0).text().replace(/기사입력\s*:\s(\d{4})\.(\d{2})\.(\d{2}).*/, '$1/$2/$3')),
        lastModified: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('iframe, #scrollDiv').remove();
    };
    return jews;
}
