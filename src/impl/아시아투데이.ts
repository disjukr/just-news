import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#fb-root, #scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('.article_head dt').text().trim(),
        content: (() => {
            const content = <HTMLElement>$('.news_bm')[0].cloneNode(true);
            $('.phototitle[style="display: none;"], .hidephotocaption, .photocaption[style="display: none;"], .daum_ddn_area, #body_relnews', content).remove();
            $('iframe[src^="/comm/ads"], iframe[id^=google_osd]', content).remove();
            content.innerHTML = content.innerHTML.split('<!-- //news_body -->')[0];
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = $('.article_head .wr_day').text();
            const timeRegex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/;
            return {
                created: new Date(parsedData.match(timeRegex)![0].replace(/-/g, '/'))
            };
        })(),
        reporters: [{
            name: $('.writer_info > .fwb > a').text().trim(),
            mail: $('.article_body > .fl').text().trim()
        }]
    };
}
