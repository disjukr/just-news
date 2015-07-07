import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('.title').text();
    jews.subtitle = $('.sub_title').eq(0).text();
    jews.content = (function () {
        var content = $('#NewsAdContent')[0].cloneNode(true);
        $('.article_msn_ad', content).remove();
        var figure = $('table[align=center]', $('#view_body').prev())[0];
        if (figure) {
            figure = figure.cloneNode(true);
            figure = clearStyles(figure).innerHTML;
        } else {
            figure = '';
        }
        return figure + clearStyles(content).innerHTML;
    })();
    var created = /게재 일자 :(.+?)년(.+?)월(.+?)일/.exec($('td', $('.title').closest('table').prev().prev()).eq(1).text());
    created.shift();
    jews.timestamp = {
        created: new Date(created.map(function (d) { return +d; }).join('/')),
        lastModified: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
}