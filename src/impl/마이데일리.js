import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#Read_Part h1').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#article')[0].cloneNode(true);
        $('div.mask_div, div[align="center"][style="margin-left:14px"], div[style="float:right; width:200px; height:200px; margin:0 !important; padding:0 !important; background:#fff; border:1px solid #ccc;"]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#Read_Part h2').contents().eq(0).text().trim().replace(/(\d{2})-(\d{2})-(\d{2})(.*)/, "20$1/$2/$3$4")),
        lastModified: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
