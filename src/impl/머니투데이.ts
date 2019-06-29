import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article, Reporter } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
    $('.util_box').remove();
}

export function parse(): Article {
    return {
        title: $('h1.subject').text(),
        subtitle: $('h2.sub_subject').text(),
        content: (() => {
            const content = $('#textBody')[0].cloneNode(true);
            $('#now-sence', content).remove();
            $('span.up, span.down', content).remove();
            $('#articleRelnewsFrame').remove();
            //?
            $('a', content).each((v: any) => {
                if ($('img', v)[0]) return;
                $(v).replaceWith(v.textContent);
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date($('.info2 .date').text().replace(/\./g, '-')), // ": 2014.06.20 06:31"형태로 들어있음
            lastModified: undefined
        },
        reporters: (() => {
            let ret: Reporter[] = [];
            $('.infobox1 a').each(function () {
                const reporter = {
                    name: $(this).text().replace(/ 기자$/, ''),
                    mail: undefined
                };
                ret.push(reporter);
            });
            const main_reporter_name = $('.conbox strong').text();
            const main_reporter_mail = $('.conbox .mail').text();
            for (let i = 0; i < ret.length; i++) {
                if (ret[i].name == main_reporter_name) {
                    ret[i].mail = main_reporter_mail;
                }
            }
            return ret;
        })(),
    };
}
