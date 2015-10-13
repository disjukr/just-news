import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.article_title02 h1').text();
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
    jews.timestamp = {
        created: new Date($('.title_foot .date').text().replace(/-/g, '/')),
        lastModified: new Date($('.title_foot .date2').text().replace(/-/g, '/'))
    };
    jews.reporters = [{
        name: $('.repoter').text(),
        mail: undefined
    }];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
