import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('.article-category-title td').eq(1).text().trim();
    jews.subtitle = $('.article-contents h4')[0].innerHTML.trim();
    jews.content = (function () {
        var content = document.createElement('div');
        $('.article-contents').contents().forEach(function (el, i) {
            if (el instanceof HTMLHeadingElement) return;
            else if (el instanceof Comment) return;
            else if (el instanceof Text) {
                if (el.data.trim() === '') return;
                else {
                    var p = document.createElement('p');
                    el.data = el.data.trim();
                    p.appendChild(el.cloneNode());
                    content.appendChild(p);
                }
            }
            else if (el instanceof HTMLParagraphElement && el.innerHTML.trim() === "") return;
            else if (el instanceof HTMLDivElement && !($(el).hasClass('article-alignC') || $(el).hasClass('article-alignR'))) return;
            else content.appendChild(el.cloneNode(true));
        });
        var ad = content.querySelectorAll('#evt_bn, #ad_box01, #recopick_widget');
        if (ad[0]) [].forEach.call(ad, function (v) {
            v.remove();
        });

        var style = document.createElement('style');
        style.textContent = '.description{margin: 0 40px 20px}';
        content.insertBefore(style, content.firstChild);
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var data = {
            created: undefined,
            lastModified: undefined
        };
        $('.article-control-menu .date span').forEach(function (el, i) {
            var match = el.textContent.match(/(등록|수정)\s*:\s+(\d{4}\.\d{2}\.\d{2}\s+\d{1,2}:\d{1,2})/);
            if (match === null) return;
            var time = new Date(match[2].replace(/\./g, '-').replace(/\s+/, 'T') + ':00+09:00'); // ISO 8601
            if (match[1] === '등록') data.created = time;
            else if (match[1] === '수정') data.lastModified = time;
        });
        return data;
    })();
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
}