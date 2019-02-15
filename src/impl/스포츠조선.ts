import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('.acle_c h1').text(),
        content: (() => {
            const content = $('.news_text .article')[0].cloneNode(true);
            $('#divBox, .mask_div, .gisa_banner, div[id^="AD_LIVE_AREA_"]', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = $('.acle_c .a_day').text().split('|');
            const created = new Date(parsedData[0].replace('기사입력', '').replace(/-/g, '/').trim());
            const lastModified = parsedData[1] ? new Date(parsedData[1].replace('최종수정', '').replace(/-/g, '/').trim()) : undefined;
            return {
                created: created,
                lastModified: lastModified
            };
        })(),
        reporters: []
    };
}
