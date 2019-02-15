import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    let created = /게재 일자 :(.+?)년(.+?)월(.+?)일/.exec($('td', $('.title').closest('table').prev().prev()).eq(1).text());
    created.shift();
    return {
        title: $('.title').text();
        subtitle: $('.sub_title').eq(0).text();
        content: (() => {
            let content = $('#NewsAdContent')[0].cloneNode(true);
            $('.article_msn_ad', content).remove();
            let figure: any = $('table[align=center]', $('#view_body').prev())[0];
            if (figure) {
                figure = figure.cloneNode(true);
                figure = clearStyles(figure).innerHTML;
            } else {
                figure = '';
            }
            return figure + clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date(created.map(function (d) { return +d; }).join('/')),
            lastModified: undefined
        },
        reporters: []
    };
}
