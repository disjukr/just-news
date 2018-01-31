import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.m_container .sub_view_tit2 h2').text().trim();
    jews.subtitle = $('.m_container .sub_view_tit2 p').text().trim() || undefined;
    jews.content = (function () {
        var content = $('.m_container .sub_view_cont')[0].cloneNode(true);
        $('.view_ad', content).remove();
        $('[align]', content).each(function (v) {
            v.removeAttribute('align');
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var created = $('.m_container .sub_view_tit3 .tit3_2 span').text().replace('입력 : ', '').replace(/\./g, '/');
        var lastModified = $('.m_container .sub_view_tit3 .tit3_3 span').text().replace('수정 : ', '').replace(/\./g, '/');
        var timeIndex;

        timeIndex = created.lastIndexOf('/');
        created = new Date(created.substring(0, timeIndex) + ' ' + created.substring(timeIndex + 1));
        timeIndex = lastModified.lastIndexOf('/');
        lastModified = new Date(lastModified.substring(0, timeIndex) + ' ' + lastModified.substring(timeIndex + 1));
        return {
            created: created,
            lastModified: lastModified
        };
    })();
    jews.reporters = (function () {
        var name = $('.m_container .sub_view_tit3 .tit3_1 span').text();
        var mail = $('.journalist_1 span a').text().trim() || undefined;
        return [{
            name: name,
            mail: mail
        }];
    })();
    jews.cleanup = function () {
        $('#scrollDiv').remove();
        document.onmousedown = null;
        window._cz_mouseClick = null;
    };
    return jews;
}
