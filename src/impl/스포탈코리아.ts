import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('iframe, #scrollDiv').remove();
};

export function parse(): Article {
    return {
        title: $('#reView h2').text().trim(),
        content: (() => {
            const image = $('#DivContents .img_review_ad')[0];
            const content = $('#DivContents .review_text02')[0].cloneNode(true);
            if (image !== undefined) {
                content.insertBefore(image.cloneNode(true), content.firstChild);
            }
            $('.ad_gigigi', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date($('#reView p').contents().eq(0).text().replace(/기사입력\s*:\s(\d{4})\.(\d{2})\.(\d{2}).*/, '$1/$2/$3')),
            lastModified: undefined
        },
        reporters: []
    };
}
