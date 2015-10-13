import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#articletitle .title h3').text();
    jews.subtitle = (function () {
        var el = document.querySelector('#articletitle .title h4');
        if (el === null) return undefined;
        return el.innerHTML;
    })();
    jews.content = (function () {
        var content = $('#article_content')[0].cloneNode(true);
        $('[style="display:none;"]', content).remove();
        $('#__inline_ms_da_ad__', content).remove();
        $('#relation_news', content).remove();
        $('span', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var text = $('.artical_date .date').text().split('/');

        var match = text[0].match(/입력 (\d{4}).(\d{2}).(\d{2}) (\d{2}):(\d{2})/);
        var created_date = new Date();
        created_date.setYear(parseInt(match[1], 10));
        created_date.setMonth(parseInt(match[2], 10) - 1);
        created_date.setDate(parseInt(match[3], 10));
        created_date.setHours(parseInt(match[4], 10));
        created_date.setMinutes(parseInt(match[5], 10));
        created_date.setSeconds(0);

        var lastModified_date;
        if (text.length > 1) {
            match = text[1].match(/수정 (\d{4}).(\d{2}).(\d{2}) (\d{2}):(\d{2})/);
            lastModified_date = new Date();
            lastModified_date.setYear(parseInt(match[1], 10));
            lastModified_date.setMonth(parseInt(match[2], 10) - 1);
            lastModified_date.setDate(parseInt(match[3], 10));
            lastModified_date.setHours(parseInt(match[4], 10));
            lastModified_date.setMinutes(parseInt(match[5], 10));
            lastModified_date.setSeconds(0);
        }
        return {
            created: created_date,
            lastModified: lastModified_date
        };
    })();
    jews.reporters = (function() {
        var reporters = $('#journalist_info li');
        var list = [];

        reporters.forEach(function (el) {
            var name = $(el).text().trim().match(/(.*?) 기자/)[1];
            var mail, mail_el = $('.email a', el);
            if (mail_el !== null) mail = mail_el.text();

            list.push({
                name: name,
                mail: mail
            });
        });

        return list;
    })();
    jews.cleanup = function () {
        $('body>iframe, #gnb_banner').remove();
    };
    return jews;
}
