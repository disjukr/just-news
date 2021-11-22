import $ from 'jquery';

import {
    clearStyles,
} from '../util';
import {
    Article,
    ReadyToParse,
} from '..';

export const readyToParse: ReadyToParse = wait => wait('.view_foot');

export const cleanup = () => {
    $('#scrollDiv, body>img').remove();
}

export function parse(): Article {
    return {
        title: $('.h_info h2').text(),
        subtitle: $('.viewbox h3').html(),
        content: (() => {
            const content = $('#pnlContent')[0].cloneNode(true);
            $('.viewpic>iframe', content).remove();
            $('div[style="text-align:right;width:250px;float:right;margin:15px 0px 0px 15px;"]', content).remove();
            $('.relatednews', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date($('.h_info ul li:nth-child(2) span').text().replace(/-/g, '/')),
            lastModified: undefined
        },
        reporters: [{
            name: $('.h_info .email span').text(),
            mail: $('.h_info .email a').attr('title')
        }],
    };
}
