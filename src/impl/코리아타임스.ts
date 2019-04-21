import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('.view_page_news .view_page_news_header_wrapper h1').text().trim(),
        subtitle: undefined,
        content: (() => {
            const content = $('#p')[0].cloneNode(true);
            $('#webtalks_btn_listenDiv', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = $('.view_page_news .view_page_news_header_wrapper span');
            let nbsp = '\xA0';
            return {
                created: new Date(parsedData.eq(0).text().replace(nbsp, ' ').replace('Posted : ', '').replace(/-/g, '/')),
                lastModified: new Date(parsedData.eq(1).text().replace(nbsp, ' ').replace('Updated : ', '').replace(/-/g, '/'))
            };
        })(),
        reporters: (() => {
            const mail = $('.view_page_translation_email a').attr('href');
            if (mail) {
                return [{
                    name: undefined,
                    mail: mail.replace('mailto:', '')
                }];
            } else {
                return [];
            }
        })()
    };
}
