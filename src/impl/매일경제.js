import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.top_title').text();
    jews.subtitle = $('.sub_title1').text();
    jews.content = (function () {
        let d = $('<div>');
        let c = $('#article_body .art_txt, #article_body img, #article_body figure');
        c.each(function(index, el) {
            $('#google_dfp_MC_250x250', el).remove();
            d.append(el);
        });
        $('img[alt="사진설명"]', d).remove();
        $('script', d).remove();
        return clearStyles(d[0]).innerHTML;
    })();
    {
        let $a = $('.news_title_author');
        let t = $('.lasttime', $a).text().replace(/\s+/g, ' ').replace('입력 :', '').split('수정 :');
        jews.timestamp = {
            created: new Date(t[0].replace(/\./g, '/')),
            lastModified: new Date(t[1].replace(/\./g, '/'))
        };
        jews.reporters = [{ name: $('.author', $a).text() }];
    }
    return jews;
}
