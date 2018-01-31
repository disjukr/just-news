import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.tit_subject').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#sub_cntTopTxt')[0].cloneNode(true);
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor)[0].innerHTML);
        });
        $('#article_bottom_ad, #divBox', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function() {
        var times = $('.time').text().split('\u3163'); // Korean vowel 'ㅣ'
        return {
            created: new Date(times[0].substr(5).replace(' ', 'T') + '+09:00'),
            lastModified: new Date(times[1].substr(5).replace(' ', 'T') + '+09:00')
        };
    })();
    jews.reporters = (function () {
        var information = $('.info_part').text().match(/(.*)\s+(.*@.*)/);
        if (information !== null) {
            return [{
                name: information[1].trim(),
                mail: information[2].trim()
            }];
        } else {
            return [{
                name: $('.info_part').text().trim(),
                mail: undefined
            }];
        }
    })();
    jews.cleanup = undefined;
    return jews;
}
