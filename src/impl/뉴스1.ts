import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Article {
    const headline = $('div.title');
    const content = $('#articles_detail')[0].cloneNode(true);
    return {
        title: $('h2', headline).text(),
        subtitle: $('h3', headline).text().replace(/\n/g, '<br>'),
        content: clearStyles(content).innerHTML,
        timestamp: {
            created: new Date($('div.info', headline).text().split('|')[1].replace(' 송고', '').replace(/\./g, '/').replace(' ', 'T').replace(/\s+/g, '') + '+0900'),
            lastModified: undefined
        },
        reporters: (() => {
            const reporters = $('div.info', headline).text().split('|')[0].replace(/\(.+?\)/, '').split(', ');
            const result = [];
            for (let x in reporters) {
                result.push({
                    name: reporters[x],
                    mail: undefined
                });
            }
            return result;
        })()
    }
}
