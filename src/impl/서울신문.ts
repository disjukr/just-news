import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article, Timestamp } from '..';

export function parse(): Article {
    return {
        title: $('.atit2').contents().eq(0).text().trim(),
        subtitle: $('.title_sub').text() || undefined,
        content: (() => {
            const content = $('#atic_txt1')[0].cloneNode(true);
            $('#hnsIframe, #ifrm_photolink, #googleAdTable, #seoulAdTable', content).remove();
            $('.dklink', content).each(function (i, v) {
                $(v).replaceWith(v.innerHTML);
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            let res: Timestamp = {};
            $('.v_days').text()
                .replace(/(입력|수정)\s\:\s(\d{4}-\d{2}-\d{2})\s*(\d{2}:\d{2})/g, (_, p1, p2, p3) => {
                    const ts = p2 + 'T' + p3 + '+09:00'; // ISO 8601
                    if (p1 === '입력') res.created = new Date(ts);
                    else if (p1 === '수정') res.lastModified = new Date(ts);
                    return '';
                });
            return res;
        })(),
        reporters: []
    };
}
