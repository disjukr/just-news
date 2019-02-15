import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('.hboxtitle').text().trim(),
        subtitle: $('.hboxsubtitle').text().trim(),
        content: clearStyles($('#news_body_area')[0].cloneNode(true)).innerHTML,
        timestamp: {
            created: new Date($('.hboxbylinedata span').text().trim().replace(/\./g, '-').replace(/\s+/, 'T') + '+09:00'),
            lastModified: undefined
        },
        reporters: [{
            name: $('.hboxbylinedata a').text(),
            mail: undefined
        }]
    };
}
