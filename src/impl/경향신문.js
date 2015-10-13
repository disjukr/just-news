import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#container .title_group .CR dt').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#sub_cntTopTxt')[0].cloneNode(true);
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor)[0].innerHTML);
        });
        $('#article_bottom_ad, #divBox', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('#container .article_date').contents();
        return {
            created: new Date(parsedData.eq(0).text().replace(/입력\s*:/, '').replace(/-/g, '/')),
            lastModified: new Date(parsedData.eq(2).text().replace(/수정\s*:/, '').replace(/-/g, '/'))
        };
    })();
    jews.reporters = (function () {
        var parsedData = $('#container .title_group .CR dd').text().trim().split(/\s+/);
        return [{
            name: parsedData[0],
            mail: parsedData[2] || undefined
        }];
    })();
    return jews;
}
