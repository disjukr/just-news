import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('#content .title').text();
    jews.subtitle = $('#content .sub_title').text();
    var content = $('#news_content')[0].cloneNode(true);
    jews.content = (function () {
        $('a[href="javascript:search_gija();"]', content).remove();
        $('[id^=div-gpt-ad]', content).parent().remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#content .info').text().replace(/(\d+)[^\d]+(\d+)[^\d]+(\d+)[^\d]+(\d+):(\d+)/, '$1/$2/$3 $4:$5')),
        lastModified: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv, #soeaFrame_, #soeaLayerLoc_st, #soeaLayerLoc_fi, iframe').remove();
    };
}