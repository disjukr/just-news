import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = document.querySelector('.newsWrap > .viewHeader > .tit_subject').textContent;
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = document.getElementById('_article').cloneNode(true);
        [].forEach.call(content.querySelectorAll('#divBox, #article_bottom_ad, .khwidgetWrap, .social_widget'), function (v) {
            v.parentNode.removeChild(v);
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = document.querySelector('.newsWrap > .viewHeader > .newsInfo > .time').textContent;
        var created = parsedData.replace('입력: ', '').replace(/(\d+)년\s*(\d+)월\s*(\d+)일\s*([\d:]+)/g, function (_, year, month, day, time) {
            return year + '/' + month + '/' + day + ' ' + time;
        });
        return {
            created: new Date(created),
            lastModified: undefined
        };
    })();
    jews.reporters = (function () {
        var parsedData = document.querySelector('.newsWrap > .viewHeader > .newsInfo > .info_part').textContent;
        var matches = parsedData.match(/[^\s]+@.+/);
        if (matches) {
            return [{
                name: parsedData.split(matches[0])[0].trim(),
                mail: matches[0]
            }];
        } else {
            return [{
                name: parsedData,
                mail: undefined
            }];
        }
    })();
    return jews;
}
