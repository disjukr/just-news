import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#title_text').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('.article')[0].cloneNode(true);
        $('.promotion', content).remove();
        $('div[class*=date_]', content).remove();
        $('#pop_videobox', content).remove();

        var image_box = $('.center_img_2011', content);
        image_box.forEach(function (el) {
            var idx = parseInt($(el).attr('id').match(/\d+/), 10);
            var player = $('#player' + idx);

            // Image Type 1 (Simple)
            if ($('dl > dd', player).length === 0) {
                $(el).replaceWith($('dl > div > img', player)[0].outerHTML);
                return;
            }

            // Image Type 2 (Without link)
            if ($('dl > dd > div > img', player).length !== 0) {
                $(el).replaceWith($('dl > dd > div > img', player)[0].outerHTML);
                return;
            }

            var link = $("dl > dd > div > a", el).attr('onclick');

            // Image Type 3 (With link)
            if (link === null) {
                $(el).replaceWith($('dl > dd > div > a > img', player)[0].outerHTML);
                return;
            }

            // Should I do this??
            if (typeof video_tags === 'undefined') {
                eval($(".article script")[0].text);
            }

            // Video
            var video_id = parseInt(link.match(/\d+/), 10);
            $(el).replaceWith(video_tags[video_id]);
        });

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
    jews.reporters = [{
        name: $('#j1').text().trim().split(' ')[0],
        mail: $('.j_con_li a').text() || undefined
    }];
    return jews;
}
