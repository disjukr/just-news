import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    var $content = $($('#articleText')[0].cloneNode(true));
    $('.mask_div', $content).remove();
    // 아래와 같은 스타일을 갖고 있는 span은 모두 광고 (#234)
    $('span[style="width:640px; height:70px; text-align:center; margin:0 10px; padding:10px 10px 15px 10px; clear:both;"]', $content).remove();
    jews.title = $('.article_text span').text();
    jews.subtitle = undefined;
    jews.content = clearStyles($content[0]).innerHTML;
    jews.timestamp = {
        created: new Date($('.new_time').text().replace('기사입력', '').replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('div[id^=soea], #wp_adbn_root, #mobon_toast_banner').remove();
        $('#scrollDiv').remove();
        $('#tbFadeIn').remove();
    };
    return jews;
}
