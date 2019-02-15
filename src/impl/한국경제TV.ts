import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('#viewTitle h2').text(),
        subtitle: undefined,
        content: (() => {
            const content = $($('#viewContent_3')[0].cloneNode(true));
            $('div>iframe', content).remove();
            $('.tt-wrapper', content).remove();
            return clearStyles(content[0]).innerHTML;
        })(),
        timestamp: {
            created: new Date($('.writeDate').text().replace('입력 : ', '').replace(/-/g, '/')),
            lastModified: undefined
        },
        reporters: (() => {
            const parsedData = $('.journalist_mail').contents();
            if (parsedData.length < 1 || parsedData.text().trim().length === 0) {
                return [];
            } else if (parsedData.length < 2) {
                return [{
                    name: parsedData.eq(0).text().trim(),
                    mail: undefined
                }];
            } else {
                return [{
                    name: parsedData.eq(0).text().trim(),
                    mail: parsedData.eq(1).text().trim()
                }];
            }
        })()
    };
}
