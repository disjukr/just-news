import $ from 'jquery';
import { clearStyles } from '../util';
import { ReadyToParse, Article, Timestamp } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export const readyToParse: ReadyToParse = wait => wait('.view-editors');

export function parse(): Article {
    return {
        title: $('.article-head-title').eq(0).text().trim(),
        subtitle: $('.article-head-sub').eq(0).text(),
        content: (() => {
            const content = $('#article-view-content-div')[0].cloneNode(true);
            $('.ad-template', content).remove();
            $('.article-sponsor', content).remove();
            $('form[name=support_paypal_form]', content).remove();
            $('.view-editors', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            let data: string = $('div.info-text>ul>li').eq(1).text().substr(3).trim();
            data = data.replace(/\./g, '-');
            data = data.replace(/\s/g, 'T');
            return {
                created: new Date(data),
            };
        })(),
        reporters: (() => {
            const parsedData = $('div.info-text>ul>li')[0];
            return [{
                name: parsedData.childNodes[0].textContent!.trim(),
                mail: parsedData.childNodes[1].childNodes[0].textContent!.trim()
            }];
        })()
    };
}
