import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('#title_text').text(),
        subtitle: $('.article h3').text(),
        content: (() => {
            const content = $('.article')[0].cloneNode(true);
            $('.promotion', content).remove();
            $('div[class*=date_]', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const timeStr = $('#date_text')[0].textContent!;
            let created;
            let cTime = timeStr.match(/입력 : ([^\|]+)/);
            if (cTime !== null) {
                created = new Date(cTime[1].trim().replace(/\./g, '/'));
            }
            let lastModified;
            const mTime = timeStr.match(/수정 : (.+)/);
            if (mTime !== null) {
                lastModified = new Date(mTime[1].trim().replace(/\./g, '/'));
            }
            return {
                created: created,
                lastModified: lastModified
            };
        })(),
        reporters: [{
            name: $('#j1').text().trim().split(' ')[0],
            mail: $('.j_con_li a').text() || undefined
        }]
    };
}
