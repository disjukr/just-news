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
    const editor = $('.view-editors a strong').text().trim();
    const emailPat = /^ @]+@[^\.]+\.[^ ]+/g;
    return {
        title: $('.article-head-title').text().trim(),
        subtitle: $('.article-head-sub').text().trim(),
        content: (() => {
            const content = $('#article-view-content-div')[0].cloneNode(true);
            $('.article-head-sub', content).remove();
            $('.view-editors', content).remove();
            $('.adsbygoogle', content).remove();
            $('.slogan', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: parseDate($('.info-text > ul > li')[1].textContent!.trim()),
            lastModified: parseDate($('.info-text > ul > li')[2].textContent!.trim())
        },
        reporters: [{
            name: editor.replace(emailPat, '').trim(),
            mail: (() => { 
                const matchs = editor.match(emailPat);
                return matchs ? matchs.join(',') : '';
            })()
        }]
    };
}
