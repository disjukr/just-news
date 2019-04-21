import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('#article_title .title_n').contents().eq(0).text().trim(),
        content: (() => {
            const content = $('#newsViewArea')[0].cloneNode(true);
            $('*[id*=google]', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date($('#article_title .reg_dt').text().replace(/[가-힣]/g, '').replace(/\s+(\d\d:\d\d)/g, 'T$1:00+09:00').trim()),
            lastModified: (() => {
                const tmp = new Date($('#article_title .upd_dt').text().replace(/-/g, '/'));
                return isNaN(tmp.getTime()) ? undefined : tmp;
            })()
        },
        reporters: []
    }
}