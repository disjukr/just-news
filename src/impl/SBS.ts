import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Article {
    return {
        title: $('#container .smdend_content_w .sep_cont_w .sed_articel_head .seda_title').text(),
        subtitle: $('#container .smdend_content_w .sep_cont_w .sed_article_w .sed_sub_title').text(),
        content: (() => {
            const content = $('#container .smdend_content_w .sep_cont_w .sed_article_w .sed_article')[0].cloneNode(true);
            $('.lazy', content).each(function (_, anchor) {
                anchor.classList.remove("lazy");
                anchor.setAttribute('src', anchor.getAttribute('data-original')!);
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = $('#container .smdend_content_w .sep_cont_w .sed_atcinfo_sec_w .sed_write_time').contents();
            let created: any = parsedData[0] || undefined;
            let lastModified: any = parsedData[2] || undefined;
            if (created) {
                created = new Date(created.textContent.replace(/\./g, '/'));
            }
            if (lastModified) {
                lastModified = new Date(lastModified.textContent.replace(/\./g, '/'));
            }
            return {
                created: created,
                lastModified: lastModified
            };
        })(),
        reporters: (() => {
            const parsedData = $('#container .smdend_content_w .sep_cont_w .seda_author').children();
            let name = parsedData.eq(0).text() || undefined;
            let mail;
            if (parsedData.length > 1) {
                mail = /(?:mailto:)?(.*)/.exec(parsedData.eq(1).attr('href')!)![1];
            }
            if (name || mail) {
                return [{
                    name: name,
                    mail: mail
                }];
            } else {
                return [];
            }
        })()
    };
}
