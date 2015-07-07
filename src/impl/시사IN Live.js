import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('.View_Title h1').text().trim();
    jews.subtitle = $('.View_Title span').text().trim();
    jews.content = (function () {
        var content = $('#articleBody')[0].cloneNode(true);
        $('table[width="320"][height="265"][align="right"], iframe', content).closest('table').remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var view_time = $('.View_Time')[0].cloneNode(true);
        $('span', view_time).remove();
        return {
            created: new Date($(view_time).text().trim().split(/\s+/).join(' ').replace(/\./g, '/')),
            lastModified: undefined
        };
    })();
    jews.reporters = (function () {
        var view_info = $('.View_Info').text().split('|').reverse();
        return [{
            name: (view_info[1] || '').trim(),
            mail: view_info[0].trim()
        }];
    })();
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
}