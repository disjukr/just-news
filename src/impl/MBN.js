import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#article_title .title_n').contents().eq(0).text().trim();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#newsViewArea')[0].cloneNode(true);
        $('*[id*=google]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#article_title .reg_dt').text().replace(/[가-힣]/g, '').replace(/\s+(\d\d:\d\d)/g, 'T$1:00+09:00').trim()),
        lastModified: (function () {
            var tmp = new Date($('#article_title .upd_dt').text().replace(/-/g, '/'));
            return isNaN(tmp.getTime()) ? undefined : tmp;
        })()
    };
    jews.reporters = [];
    return jews;
}