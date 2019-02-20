import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

const toDate = (elem) => new Date(elem.text().trim().split(/\s/).slice(-2).join(' '));

export function parse(): Article {
    // reporter | created | lastModified
    const timeSection = $('#news_content_1 .wrap_time span');

    return {
        title: $('#news_content_1 .title').text(),
        content: (() => {
            const content = $('#news_content_1 .cont .body')[0].cloneNode(true);
            $('div.print_video_img', content).remove();

            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: toDate($(timeSection.get(1))),
            lastModified: timeSection.length === 3 ? toDate($(timeSection.get(2))) : undefined
        },
        reporters: [{
            name: $($('#news_content_1 .wrap_time span').get(0)).text().trim(),
            mail: undefined
        }]
    };
}
