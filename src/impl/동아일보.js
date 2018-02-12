import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.article_title .title').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('.article_txt')[0].cloneNode(true);
        $('.title_foot', content).remove();
        $('.txt_ad, [class^=sub_cont_AD]', content).remove();
        $('.recommend', content).remove();
        $('.article_relation', content).remove();
        $('.t_sns', content).remove();
        $('[alt="기자의 다른기사 더보기"]', content).parent().remove();
        $('.cha_link', content).each(function () {
            $(this).parent().remove();
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var times = $('.title_foot .date01');
        return {
            created: new Date(times[0].textContent.replace('입력 ', '').replace(/-/g, '/')),
            lastModified: new Date(times[1].textContent.replace('수정 ', '').replace(/-/g, '/'))
        };
    })();
    jews.reporters = [{
        name: $('.repoter').text(),
        mail: undefined
    }];
    jews.cleanup = function () {
        $('#bestnews_layer, #scrollDiv, #sub_ad01, #sub_ad02').remove();
    };
    return jews;
}
