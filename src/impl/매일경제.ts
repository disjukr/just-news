import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    let $a = $('.news_title_author');
    let t = $('.lasttime', $a).text().replace(/\s+/g, ' ').replace('입력 :', '').split('수정 :');
    return {
        title: $('.top_title').text(),
        subtitle: $('.sub_title1').text(),
        content: (() => {
            let d = $('<div>');
            let c = $('#article_body .art_txt, #article_body img, #article_body figure');
            c.each(function (_, el) {
                $('#google_dfp_MC_250x250', el).remove();
                d.append(el);
            });
            $('img[alt="사진설명"]', d).remove();
            $('script', d).remove();
            return clearStyles(d[0]).innerHTML;
        })(),
        timestamp: {
            created: new Date(t[0].replace(/\./g, '/')),
            lastModified: new Date(t[1].replace(/\./g, '/'))
        },
        reporters: [{ name: $('.author', $a).text() }]
    };
}
