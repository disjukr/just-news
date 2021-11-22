import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('.tit_news .tit_sect .txt_tit strong').text(),
        subtitle: $('.tit_news .tit_sect .desc')[0].innerHTML,
        content: (() => {
            const content = $($('#article_body')[0].cloneNode(true));
            $('#ad_body', content).remove();
            return clearStyles(content[0]).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = $('.sub_news_data .news_data .list_02').text().split('|');
            return {
                created: new Date(parsedData[0].replace('입력 : ', '').replace(/\./g, '/')),
                lastModified: new Date(parsedData[1].replace(' 수정 : ', '').replace(/\./g, '/'))
            };
        })(),
        reporters: [{
            name: $('.sub_news_data .news_data .list_01 a').eq(0).text().trim(),
            mail: $('.sub_news_data .news_data .list_01 .reporter_layer dd span a').text() || undefined
        }]
    };
}
