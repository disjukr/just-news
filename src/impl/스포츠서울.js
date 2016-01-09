import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.viewtitle').text();
    jews.subtitle = undefined;
    jews.content = (function() {
        var content = $('.article')[0].cloneNode(true);
        $('span[style="margin-top:30px; float:right;padding-right:1px;margin-left:5px;display:inline;z-index:1;"]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function() {
        var time_info = $('.dateWrap li .date');
        return {
            // ISO 8601
            created: new Date(time_info[0].innerHTML.split(' ').join('T') + '+09:00'),
            lastModified: new Date(time_info[1].innerHTML.split(' ').join('T') + '+09:00')
        };
    })();
    jews.reporters = [];
    jews.cleanup = function () {
        $('span, iframe, #wp_adbn_root, #scrollDiv').remove();
    };
    return jews;
}
