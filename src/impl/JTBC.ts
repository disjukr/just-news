import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article, Reporter } from 'index';

export function parse(): Article {
    return {
        title: $('#articletitle .title h3').text(),
        subtitle: $('#sub_articletitle .title h4').html() || undefined,
        content: (() => {
            const tmp = $('#articlebody .article_content')[0].cloneNode(true);
            $('.article_msn_ad, #id_movie_area, .article_list, .regard_area', tmp).remove();
            return clearStyles(tmp).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = $('.artical_date').children();
            let lastModified;
            if (parsedData.length > 1) {
                lastModified = new Date(parsedData.eq(1).text().replace('수정 ', '').replace(/-/g, '/'));
            }
            return {
                created: new Date(parsedData.eq(0).text().replace('입력 ', '').replace(/-/g, '/')),
                lastModified: lastModified
            };
        })(),
        reporters: (() => {
            let result: Reporter[] = [];
            const textReporter = $('#textReporter_area dl');
            const cameraReporter = $('#cameraReporter_area dl');
            const editReporter = $('#editReporter_area dl');
            [textReporter, cameraReporter, editReporter].forEach((v) => {
                if (v.length > 0) {
                    const mail = $('.sns a[href^="mailto:"]', v).eq(0).attr('href');
                    result.push({
                        name: $('.name', v).contents().eq(0).text().trim(),
                        mail: mail ? mail.replace('mailto:', '') : undefined
                    });
                }
            });
            return result;
        })()
    };
}
