import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('#news_title_text_id').text(),
        content: (() => {
            const content = $('#news_body_id')[0].cloneNode(true);
            $('#date_text, #keyword, #rel_art_list_id, .copy_2011, script, iframe', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const timeStr = $('.news_date')[0].textContent!;
            let created;
            const cTime = timeStr.match(/입력 : ([^\|]+)/);
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
        reporters: $('.news_title_author a').get().map((v) => {
            return {
                name: v.textContent!,
                mail: undefined
            };
        })
    };
}
