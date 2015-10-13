import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = document.querySelector('.container>.content>.titleh1>h1').childNodes[0].textContent;
    jews.subtitle = $('.container>.content>.titleh2>h2').text() || undefined;
    jews.content = clearStyles(document.getElementById('article_txt')).innerHTML;
    jews.timestamp = { created: undefined, lastModified: undefined };
    document.getElementById('SG_ArticleDateLine').textContent
        .replace(/(입력|수정)\s*(\d{4}-\d{2}-\d{2})\s*(\d{2}:\d{2}:\d{2})/g, function(_, p1, p2, p3){
            var ts = p2 + 'T' + p3 + '+09:00'; // ISO 8601
            if (p1 === '입력') jews.timestamp.created = new Date(ts);
            else if (p1 === '수정') jews.timestamp.lastModified = new Date(ts);
        });
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv, #realclick_view, script, iframe, .mask_div').remove();
    };
    return jews;
}
