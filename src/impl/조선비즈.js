import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#title_text').text();
    jews.subtitle = $('.article h3').text();
    jews.content = (function () {
        var content = $('.article')[0].cloneNode(true);
        $('.promotion', content).remove();
        $('div[class*=date_]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var timeStr = $('#date_text')[0].textContent;
        var created;
        var cTime = timeStr.match(/입력 : ([^\|]+)/);
        if (cTime !== null) {
            created = new Date(cTime[1].trim().replace(/\./g, '/'));
        }
        var lastModified;
        var mTime = timeStr.match(/수정 : (.+)/);
        if (mTime !== null) {
            lastModified = new Date(mTime[1].trim().replace(/\./g, '/'));
        }
        return {
            created: created,
            lastModified: lastModified
        };
    })();
    jews.reporters = [{
        name: $('#j1').text().trim().split(' ')[0],
        mail: $('.j_con_li a').text() || undefined
    }];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
