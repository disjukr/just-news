import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
};

export function parse(): Article {
    return {
        title: $('.View_Title h1').text().trim(),
        subtitle: $('.View_Title span').text().trim(),
        content: (() => {
            const content = $('#articleBody')[0].cloneNode(true);
            $('table[width="320"][height="265"][align="right"], iframe', content).closest('table').remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const view_time = $('.View_Time')[0].cloneNode(true);
            $('span', view_time).remove();
            return {
                created: new Date($(view_time).text().trim().split(/\s+/).join(' ').replace(/\./g, '/')),
                lastModified: undefined
            };
        })(),
        reporters: (() => {
            const view_info = $('.View_Info').text().split('|').reverse();
            return [{
                name: (view_info[1] || '').trim(),
                mail: view_info[0].trim()
            }];
        })()
    };
}
