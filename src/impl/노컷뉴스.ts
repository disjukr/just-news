import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Article {
    return {
        title: $('.reporter_info h2').text(),
        subtitle: $('.viewbox h3').text(),
        content: (() => {
            const content = $('#pnlContent')[0].cloneNode(true);
            $('.relatednews', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date($('.reporter_info ul li:first-child span').text().replace(/-/g, '/')),
            lastModified: undefined
        },
        reporters: [{
            name: $('.reporter_info .email span').text(),
            mail: $('.reporter_info .email a').attr('title')
        }],
        cleanup: () => {
            $('#scrollDiv').remove();
        }
    };
}
