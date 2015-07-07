import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('.title > h3').text();
    jews.subtitle = undefined;
    jews.content = (function() {
        var content = $('#view_subject.subject')[0].cloneNode(true);
        $('.mask_div', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function() {
        var time_info = $('.title > em').text().trim();
        var result = {
            created: undefined,
            lastModified: undefined
        };
        time_info.replace(/\./g, '-').replace(/(입력|수정)\s*(\d{4}-\d{2}-\d{2})\s*(\d{2}:\d{2})/g, function(_, p1, p2, p3){
            var ts = p2 + 'T' + p3 + '+09:00'; // ISO 8601
            if (p1 === '입력') result.created = new Date(ts);
            else if (p1 === '수정') result.lastModified = new Date(ts);
        });
        return result;
    })();
    jews.reporters = [];
    jews.cleanup = function () {
        $('span, iframe, #wp_adbn_root, #scrollDiv').remove();
    };
}