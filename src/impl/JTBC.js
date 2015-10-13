import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#articletitle .title h3').text();
    jews.subtitle = $('#sub_articletitle .title h4').html() || undefined;
    jews.content = (function () {
        var content = $('#articlebody .article_content')[0].cloneNode(true);
        $('.article_msn_ad, #id_movie_area, .article_list, .regard_area', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.artical_date').children();
        var lastModified;
        if (parsedData.length > 1) {
            lastModified = new Date(parsedData.eq(1).text().replace('수정 ', '').replace(/-/g, '/'));
        }
        return {
            created: new Date(parsedData.eq(0).text().replace('입력 ', '').replace(/-/g, '/')),
            lastModified: lastModified
        };
    })();
    jews.reporters = (function () {
        var result = [];
        var textReporter = $('#textReporter_area dl');
        var cameraReporter = $('#cameraReporter_area dl');
        var editReporter = $('#editReporter_area dl');
        [textReporter, cameraReporter, editReporter].forEach(function (v) {
            if (v.length > 0) {
                result.push({
                    name: $('.name', v).contents().eq(0).text().trim(),
                    mail: $('.sns a[href^="mailto:"]', v).eq(0).attr('href').replace('mailto:', '')
                });
            }
        });
        return result;
    })();
    return jews;
}
