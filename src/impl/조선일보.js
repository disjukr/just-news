import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#news_title_text_id').text();

    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#news_body_id')[0].cloneNode(true);
        $('#date_text, #keyword, #rel_art_list_id, .copy_2011, script, iframe', content).remove();

        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var timeStr = $('#date_text')[0].textContent;
        var created;
        var cTime = timeStr.match(/입력 : ([^\|]+)/);
        if (cTime !== null) {
            created = new Date(cTime[1].trim().replace(/\./g, '/'));
        }
        var lastModified;
        var mTime = timeStr.match(/수정 : (.+)/);
        if (mTime !== null) {
            lastModified = new Date(mTime[1].trim().replace(/\./g, '/'));
        }
        return {
            created: created,
            lastModified: lastModified
        };
    })();
    jews.reporters = [];

    $('.news_title_author a').each(function(){
        jews.reporters.push({
            name: $(this).text(),
            mail: undefined
        });
    });
    return jews;
}
