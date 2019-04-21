import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    const parseDate = (t: string) => {
        let date = /(\d{4})\-(\d{2})\-(\d{2})/.exec(t),
            m = /(\d)일전/.exec(t),
            d = 1000 * 60 * 60 * 24;

        if (date !== null) return new Date(t.replace(/-/g, '/').replace(/[가-힣]/g, '').replace(/^\s+/g, ''));
        else {
            if (m === null) {
                if ((m = /(\d+)시간전/.exec(t)) !== null) d /= 24;
                else if ((m = /(\d+)분전/.exec(t)) !== null) d /= 24 * 60;
            }
            if (m !== null) return new Date(((Date.now() / d | 0) - (Number(m[1]) | 0)) * d - 1000 * 60 * 60 * 9 /* +09:00 */);
            else return undefined;
        }
    };
    return {
        title: $('#news_title').text().trim(),
        subtitle: $('#news_title2').text().trim(),
        content: (() => {
            const content = $('#news_content')[0].cloneNode(true);
            $('.adsbygoogle', content).remove();
            $('.slogan', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: parseDate($('.news_dates')[0].childNodes[0].textContent!.trim()),
            lastModified: parseDate($('.news_dates')[0].childNodes[2].textContent!.trim())
        },
        reporters: [{
            name: $('#news_sig strong').text(),
            mail: $('#news_sig').text().replace(/[가-힣()]/g, '').trim()
        }]
    };
}
