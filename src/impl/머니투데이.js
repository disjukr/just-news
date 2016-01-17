import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#article h1').text();
    jews.subtitle = $('#article h2').text();
    jews.content = (function () {
        var content = $('#textBody')[0].cloneNode(true);
        $('#now-sence', content).remove();
        $('span.up, span.down', content).remove();
        $('a', content).each(function (v) {
            if ($('img', v)[0]) return;
            $(v).replaceWith(v.textContent);
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.infobox1 .num:first').text().replace(": ", "").replace(/\./g, '/')), // ": 2014.06.20 06:31"형태로 들어있음
        lastModified: undefined
    };
    jews.reporters = (function () {
        var ret = [];
        $('.infobox1 a').each(function () {
            var reporter = {
                name: $(this).text().replace(/ 기자$/, ''),
                mail: undefined
            };
            ret.push(reporter);
        });
        var main_reporter_name = $('.conbox strong').text();
        var main_reporter_mail = $('.conbox .mail').text();
        for (var i = 0; i < ret.length; i++) {
            if (ret[i].name == main_reporter_name) {
                ret[i].mail = main_reporter_mail;
            }
        }
        return ret;
    })();
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
