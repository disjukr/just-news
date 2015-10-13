import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    var headline = $('.hbox');
    var content = $('#news_body_area')[0].cloneNode(true);
    jews.title = $('h2', headline).text();
    jews.subtitle = (function(){
        var h3 = $('h3', headline).text();
        var p_toptitle = $('p.toptitle', headline).text();

        if (p_toptitle) {
            return h3 + '<br>' + p_toptitle;
        } else {
            return h3;
        }
    })();
    jews.reporters = [{
        'name': $('.cnt_view.news_body_area > div:eq(-2) ul a li').text(),
        'mail': undefined
    }];
    console.log($('.arvdate').text().split(/최종편집\s+/));
    jews.timestamp = {
        'created': undefined,
        'lastModified': new Date($('.arvdate').text().split(/최종편집\s+/)[1].replace(/\./g, '-').replace(/\s+/, 'T') + '+09:00') // ISO 8601
    };
    $('>div:last-child', content).remove();
    jews.content = clearStyles(content).innerHTML;
    return jews;
}
