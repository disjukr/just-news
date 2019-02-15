import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article, Reporter } from 'index';

export const cleanup = () => {
    $('body>iframe, #gnb_banner, #criteo_network').remove();
}

export function parse(): Article {
    return {
        title: $('.article_head .headline').text(),
        subtitle: (() => {
            const el = document.querySelector('#articletitle .title h4');
            if (el === null) return undefined;
            return el.innerHTML;
        })(),
        content: (() => {
            const content = $('#article_body')[0].cloneNode(true);
            $('[style="display:none;"]', content).remove();
            $('#__inline_ms_da_ad__', content).remove();
            $('#relation_news', content).remove();
            $('span', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const text = $('.article_head .byline').text();

            let match = text.match(/입력 (\d{4}).(\d{2}).(\d{2}) (\d{2}):(\d{2})/)!;
            const created_date = new Date();
            created_date.setFullYear(parseInt(match[1], 10));
            created_date.setMonth(parseInt(match[2], 10) - 1);
            created_date.setDate(parseInt(match[3], 10));
            created_date.setHours(parseInt(match[4], 10));
            created_date.setMinutes(parseInt(match[5], 10));
            created_date.setSeconds(0);

            let lastModified_date;
            match = text.match(/수정 (\d{4}).(\d{2}).(\d{2}) (\d{2}):(\d{2})/)!;
            if (match && match.length > 1) {
                lastModified_date = new Date();
                lastModified_date.setFullYear(parseInt(match[1], 10));
                lastModified_date.setMonth(parseInt(match[2], 10) - 1);
                lastModified_date.setDate(parseInt(match[3], 10));
                lastModified_date.setHours(parseInt(match[4], 10));
                lastModified_date.setMinutes(parseInt(match[5], 10));
                lastModified_date.setSeconds(0);
            }
            return {
                created: created_date,
                lastModified: lastModified_date
            };
        })(),
        reporters: (() => {
            const reporters = $('.layer_journalist_wrap');
            let list: Reporter[] = [];
            reporters.each((_, el) => {
                const name = $('.layer_journalist_area .mg a', el).text().trim().match(/(.*?) 기자/)![1];
                var mail, mail_el = $('.share_area a', el);
                if (mail_el.attr('href') !== null) mail = mail_el.attr('href')!.replace(/mailto:/, '');

                list.push({
                    name: name,
                    mail: mail
                });
            });
            return list;
        })()
    };
}
