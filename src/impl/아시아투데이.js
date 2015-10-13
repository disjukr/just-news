import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.news_title').text();
    jews.subtitle = $('.sub_title').text() || undefined;
    jews.content = (function () {
        var content = $('.news_bm')[0].cloneNode(true);
        $('.phototitle[style="display: none;"], .hidephotocaption, .photocaption[style="display: none;"], .daum_ddn_area, #body_relnews', content).remove();
        content.innerHTML = content.innerHTML.split('<!-- //news_body -->')[0];
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.news_date').text().split(',');
        var timeRegex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/;
        var lastModified;
        if (parsedData.length > 1) {
            lastModified = new Date(parsedData[1].match(timeRegex)[0].replace(/-/g, '/'));
        }
        return {
            created: new Date(parsedData[0].match(timeRegex)[0].replace(/-/g, '/')),
            lastModified: lastModified
        };
    })();
    jews.reporters = [{
        name: $('.gisa_moree a').contents().eq(0).text().trim(),
        mail: $('.gija_mail').text()
    }];
    jews.cleanup = function () {
        $('#fb-root, #scrollDiv').remove();
    };
    return jews;
}
