import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('.head_tit').text();
    jews.subtitle = $('.sub_tit').text();
    jews.content = (function () {
        var content = $('#artText')[0].cloneNode(true);
        return $('.read_txt, .center_image', content).toArray().map(function (el) {
            $('[id^=google_dfp]', el).remove();
            return $(clearStyles(el)).html();
        }).join('');
    })();
    jews.timestamp = {
        created: new Date($('#view_tit .sm_num').eq(0).text().replace(/\./g, '/')),
        lastModified: new Date($('#view_tit .sm_num').eq(1).text().replace(/\./g, '/'))
    };
    jews.reporters = [];
}