import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('#news_title').text().trim();
    jews.subtitle = $('#news_title2').text().trim();
    jews.content = (function () {
        var content = $('#news_content')[0].cloneNode(true);
        $('.adsbygoogle', content).remove();
        $('.slogan', content).remove();
        return clearStyles(content).innerHTML;
    })();
    function parseDate(t) {
        var date = /(\d{4})\-(\d{2})\-(\d{2})/.exec(t),
            m = /(\d)일전/.exec(t),
            d = 1000 * 60 * 60 * 24;

        if (date !== null) return new Date(t.replace(/-/g, '/').replace(/[가-힣]/g, '').replace(/^\s+/g, ''));
        else {
            if (m === null){
                if ((m = /(\d+)시간전/.exec(t)) !== null) d /= 24;
                else if ((m = /(\d+)분전/.exec(t)) !== null) d /= 24 * 60;
            }
            if (m !== null) return new Date(((Date.now() / d | 0) - (m[1] | 0)) * d - 1000 * 60 * 60 * 9 /* +09:00 */);
        }
    }
    jews.timestamp = {
        created: parseDate($('.news_dates')[0].childNodes[0].textContent.trim()),
        lastModified: parseDate($('.news_dates')[0].childNodes[2].textContent.trim())
    };
    jews.reporters = [{
        name: $('#news_sig strong').text(),
        mail: $('#news_sig').text().replace(/[가-힣()]/g, '').trim()
    }];
}