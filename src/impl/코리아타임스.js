import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('.view_page_news .view_page_news_header_wrapper h1').text().trim();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#p')[0].cloneNode(true);
        $('#webtalks_btn_listenDiv', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.view_page_news .view_page_news_header_wrapper span');
        var nbsp = '\xA0';
        return {
            created: new Date(parsedData.eq(0).text().replace(nbsp, ' ').replace('Posted : ', '').replace(/-/g, '/')),
            lastModified: new Date(parsedData.eq(1).text().replace(nbsp, ' ').replace('Updated : ', '').replace(/-/g, '/'))
        };
    })();
    jews.reporters = (function () {
        var mail = $('.view_page_translation_email a').attr('href');
        if (mail) {
            return [{
                name: undefined,
                mail: mail.replace('mailto:', '')
            }];
        } else {
            return [];
        }
    })();
}