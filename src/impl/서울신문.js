import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.atit2').contents().eq(0).text().trim();
    jews.subtitle = $('.title_sub').text() || undefined;
    jews.content = (function () {
        var content = $('#atic_txt1')[0].cloneNode(true);
        $('#hnsIframe, #ifrm_photolink, #googleAdTable', content).remove();
        $('.dklink', content).each(function (i, v) {
            $(v).replaceWith(v.innerHTML);
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: undefined,
        lastModified: undefined
    };
    $('.v_days').text()
        .replace(/(입력|수정)\s\:\s(\d{4}-\d{2}-\d{2})\s*(\d{2}:\d{2})/g, function (_, p1, p2, p3) {
            var ts = p2 + 'T' + p3 + '+09:00'; // ISO 8601
            if (p1 === '입력') jews.timestamp.created = new Date(ts);
            else if (p1 === '수정') jews.timestamp.lastModified = new Date(ts);
        });
    jews.reporters = [];
    return jews;
}
