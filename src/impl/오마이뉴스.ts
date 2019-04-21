import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('.newstitle .tit_subject a').text(),
        subtitle: $('.newstitle .tit_subtit a').text(),
        content: (() => {
            const content = $('.at_contents')[0].cloneNode(true);
            $('.atc_btn', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            let lastModified: any = $('.newstitle .info_data div').eq(0).text().split(/최종 업데이트 |l/)[2];
            if (lastModified)
                lastModified = new Date('20' + lastModified.replace(/\./g, '/'));
            else
                lastModified = undefined;
            return {
                created: new Date('20' + $('.newstitle .info_data div')[0].childNodes[0].textContent!.replace(/\./g, '/')),
                lastModified: lastModified
            };
        })(),
        reporters: [{
            name: $('.newstitle .info_data div a').eq(0).text(),
            mail: undefined
        }]
    };
}
