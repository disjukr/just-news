import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('.viewnewstitle').text(),
        content: (() => {
            const content = $('#articleBody')[0].cloneNode(true);
            const centerImage = $('.center_img')[0];
            if (centerImage) {
                return clearStyles(centerImage.cloneNode(true)).innerHTML + clearStyles(content).innerHTML;
            }
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const $time = $('font', $('.viewnewstitle').closest('tbody'));
            return {
                created: new Date($time.eq(0).text().replace(/\[|\]/g, '').replace(/-/g, '/')),
                lastModified: $time.eq(1).text() ? new Date($time.eq(1).text().replace(/\[|\]/g, '').replace(/-/g, '/')) : undefined
            };
        })(),
        reporters: []
    };
}
