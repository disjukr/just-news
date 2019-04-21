import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article, Timestamp } from '..';

export const cleanup = () => {
    $('#scrollDiv, #realclick_view, script, iframe, .mask_div').remove();
}

export function parse(): Article {
    return {
        title: document.querySelector('.container>.content>.titleh1>h1')!.childNodes[0].textContent,
        subtitle: $('.container>.content>.titleh2>h2').text() || undefined,
        content: clearStyles(document.getElementById('article_txt')!).innerHTML,
        timestamp: (() => {
            let res: Timestamp = {};
            document.getElementById('SG_ArticleDateLine')!.textContent!
                .replace(/(입력|수정)\s*(\d{4}-\d{2}-\d{2})\s*(\d{2}:\d{2}:\d{2})/g, (_, p1, p2, p3) => {
                    var ts = p2 + 'T' + p3 + '+09:00'; // ISO 8601
                    if (p1 === '입력') res.created = new Date(ts);
                    else if (p1 === '수정') res.lastModified = new Date(ts);
                    return '';
                });
            return res
        })(),
        reporters: []
    };
}
