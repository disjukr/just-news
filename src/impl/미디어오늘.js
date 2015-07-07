import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('#font_title').text().trim();
    jews.subtitle = $('#font_subtitle').text();
    jews.content = (function () {
        var content = $('#media_body')[0].cloneNode(true);
        $('.ad_lumieyes_area', content).each(function (i, el) {
            $(el).closest('tr').remove();
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var data = {};
        $('td[align="left"] table td', $('#font_email').closest('table').closest('td').closest('table')).text().split(/(입력|노출)\s*:([\d\-\.\s:]+)/).forEach(function (v, i, arr) {
            if (v === '입력')
                data.created = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
            else if (v === '노출')
                data.lastModified = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
        });
        return data;
    })();
    jews.reporters = (function () {
        var parsedData = $('#font_email').text().split('|');
        return [{
            name: parsedData[0].trim(),
            mail: parsedData[1].trim()
        }];
    })();
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
}