import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#bestnews_layer, #scrollDiv, #sub_ad01, #sub_ad02').remove();
}

export function parse(): Article {
    return {
        title: $('.article_title .title').text(),
        content: (() => {
            const content = $('.article_txt')[0].cloneNode(true);
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
        })(),
        timestamp: (() => {
            const times = $('.title_foot .date01');
            return {
                created: new Date(times[0].textContent!.replace('입력 ', '').replace(/-/g, '/')),
                lastModified: new Date(times[1].textContent!.replace('수정 ', '').replace(/-/g, '/'))
            };
        })(),
        reporters: [{
            name: $('.repoter').text(),
            mail: undefined
        }],
    };
}
