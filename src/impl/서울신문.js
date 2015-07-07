import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('.title_main').contents().eq(0).text().trim();
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
        created: new Date($('.VCdate').text().trim().split(' ')[0]),
        lastModified: undefined
    };
    jews.reporters = [];
}