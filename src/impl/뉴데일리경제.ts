import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    const headline = $('.hbox');
    const content = $('#news_body_area')[0].cloneNode(true);
    $('>div:last-child', content).remove();
    return {
        title: $('h2', headline).text(),
        subtitle: (() => {
            const h3 = $('h3', headline).text();
            const p_toptitle = $('p.toptitle', headline).text();

            if (p_toptitle)
                return h3 + '<br>' + p_toptitle;
            return h3;
        })(),
        reporters: [{
            'name': $('.cnt_view.news_body_area > div:eq(-2) ul a li').text(),
            'mail': undefined
        }],
        timestamp: {
            'created': undefined,
            'lastModified': new Date($('.arvdate').text().split(/최종편집\s+/)[1].replace(/\./g, '-').replace(/\s+/, 'T') + '+09:00') // ISO 8601
        },
        content: clearStyles(content).innerHTML
    };
}
