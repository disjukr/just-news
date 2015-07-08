import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    return new Promise(resolve => {
        let jews = {};
        var category = $('.article-category').text();
        if (category === '뉴스 타임라인') {
            // Don't call done() to show unmodified web page.
            return;
        }
        jews.title = $('.title-zone h2').text();
        jews.subtitle = $('.title-zone .subtitle').text() || undefined;
        jews.content = (function () {
            var content = document.createElement('div');
            $('.article-body>p, .article-body>.news_photo').each(function (i, v) {
                content.appendChild(v);
            });
            return clearStyles(content).innerHTML;
        })();
        var amb = $('.article-meta-bottom')[0];
        [].some.call(amb.getElementsByClassName('date'), function (v) {
            var a=v.textContent.match(/^\s*[가-힣]+ (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})\s*$/);
            if (a !== null) {
                jews.timestamp = {created: undefined, lastModified: new Date(a[1] + 'T' + a[2] + '+09:00')}; // ISO 8601
                return true;
            }
        });
        jews.reporters = [{
            name: amb.getElementsByClassName('writer')[0].textContent.trim(),
            mail: amb.getElementsByClassName('email')[0].textContent.trim() || undefined
        }];
        // Explicitly call done() although this is not asynchronous.
        resolve(jews);
    });
}
