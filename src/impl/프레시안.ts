import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    $('#scrollDiv, body>img').remove();
}

export function parse(): Article {
    return {
        title: $('.text-info .title').text().trim(),
        subtitle: $('.hboxsubtitle').text().trim(),
        content: clearStyles($('#news_body_area')[0].cloneNode(true)).innerHTML,
        timestamp: {
            created: new Date($('.byotherspan .date').text().trim().replace(/\./g, '-').replace(/\s+/, 'T') + '+09:00'),
            lastModified: undefined
        },
        reporters: [{
            name: $('.head_writer_fullname .byother').text().trim(),
            mail: undefined
        }]
    };
}
