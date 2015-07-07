import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#view_titlebox .view_titlebox_r1').text();
    jews.subtitle = $('#view_titlebox .view_subtitle')[0].innerHTML.trim();
    jews.content = (function () {
        var content = $($('#view_con')[0].cloneNode(true));
        $('a.dklink', content).each(function (i, el) {
            $(el).replaceWith(el.textContent);
        });
        $('.contents_img', content).each(function (i, el) {
            el.removeAttribute('width');
        });
        return clearStyles(content[0]).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#view_titlebox2_3 span').text().replace('등록 : ', '').replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var parsedData = $('#view_page .view_title_sub').eq(0).contents()[0].textContent.trim();
        var matches = parsedData.match(/(.*)\((.*)\)/);
        return [{
            name: matches[1],
            mail: matches[2]
        }];
    })();
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
