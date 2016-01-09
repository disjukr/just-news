import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.top_title').text();
    jews.subtitle = $('.sub_title1').text();
    jews.content = (function () {
        let c = $('#article_body .art_txt')[0].cloneNode(true);
        $('#google_dfp_MC_250x250', c).remove();
        return clearStyles(c).innerHTML;
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
