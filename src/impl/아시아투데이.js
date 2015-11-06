import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.article_head dt').text().trim();
    jews.content = (function () {
        var content = $('.news_bm')[0].cloneNode(true);
        $('.phototitle[style="display: none;"], .hidephotocaption, .photocaption[style="display: none;"], .daum_ddn_area, #body_relnews', content).remove();
        $('iframe[src^="/comm/ads"], iframe[id^=google_osd]', content).remove();
        content.innerHTML = content.innerHTML.split('<!-- //news_body -->')[0];
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.article_head .wr_day').text();
        var timeRegex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/;
        return {
            created: new Date(parsedData.match(timeRegex)[0].replace(/-/g, '/'))
        };
    })();
    jews.reporters = [{
        name: $('.writer_info > .fwb > a').text().trim(),
        mail: $('.article_body > .fl').text().trim()
    }];
    jews.cleanup = function () {
        $('#fb-root, #scrollDiv').remove();
    };
    return jews;
}
