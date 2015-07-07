import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('.hgroup h1').text() || undefined;
    jews.subtitle = $('.hgroup h3').text();
    jews.content = (function () {
        var content = $('.article_body')[0].cloneNode(true);
        $('#openLine, .art_reporter, .article_ad, .sns_area2, *[src^="http://adv"]', content).remove();
        $('.daum_ddn_area, [id^=beacon]', content).remove();
        $('.a_ict_word', content).each(function (i, el) {
            $(el).replaceWith($('.ict_word', el).text());
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date(($('.a_date').text().match(/\d+\.\d+\.\d+/)||[""])[0].replace(/\./g, '/')),
        modefied: undefined
    };
    jews.reporters = [{
        name: $('.art_reporter strong').text(),
        mail: $('.art_reporter .mail').text()
    }];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
}