import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article, Timestamp } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('#font_title').text().trim(),
        subtitle: $('#font_subtitle').text(),
        content: (() => {
            const content = $('#media_body')[0].cloneNode(true);
            $('.ad_lumieyes_area', content).each((_, el) => {
                $(el).closest('tr').remove();
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            let data: Timestamp = {};
            $('td[align="left"] table td', $('#font_email').closest('table').closest('td').closest('table')).text().split(/(입력|노출)\s*:([\d\-\.\s:]+)/).forEach(function (v, i, arr) {
                if (v === '입력')
                    data.created = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
                else if (v === '노출')
                    data.lastModified = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
            });
            return data;
        })(),
        reporters: (() => {
            const parsedData = $('#font_email').text().split('|');
            return [{
                name: parsedData[0].trim(),
                mail: parsedData[1].trim()
            }];
        })()
    };
}
