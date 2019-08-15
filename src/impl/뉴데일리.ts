import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    const titleData = $('#titlebox');
    const reporter = $('#writerProfileCon');
    const content = $('#ndArtBody')[0].cloneNode(true);
    $('#writerProfileCon ~ div', content).remove();
    $('#writerProfileCon', content).remove();
    return {
        title: $('h1', titleData).text(),
        subtitle: (() => {
            const h3 = $('h3', titleData).text();
            const h2 = $('h2', titleData).text();
            if (h3)
                return h3 + '<br>' + h2;
            return h3;
        })(),
        content: clearStyles(content).innerHTML,
        timestamp: {
            created: undefined,
            lastModified: new Date($('.writeInfo').text().split('최종편집 ')[1].trim().replace(/\./g, '-').replace(' ', 'T') + '+09:00') // ISO 8601
        },
        reporters: [{
            name: $('.filetxt.mt12', reporter).text(),
            mail: $('.filetxtmail', reporter).text()
        }]
    };
}
