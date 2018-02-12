import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.read_view_wrap dt').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        let content = $('#article')[0].cloneNode(true);
        $('div.mask_div, div[align="center"][style="margin-left:14px"], div[style="float:right; width:200px; height:200px; margin:0 !important; padding:0 !important; background:#fff; border:1px solid #ccc;"]', content).remove();
        $('iframe[src^="../../ad"]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date(('20' + $('.read_view_date').text()).replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
