import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('.newstitle').text(),
        subtitle: $('.subtitle').html() || undefined,
        content: (() => {
            const content = $('#viewcontent_inner, #viewcontent')[0].cloneNode(true);
            let image: any = $('#imgReTouchLoc_1');
            if (image[0]) {
                image = image[0].cloneNode(true);
                $('.gal', image).remove();
            } else {
                image = false;
            }
            $('.stocksise', content).each(function (i, el) {
                $(el).replaceWith($('b', el).text());
            });
            return (image ? clearStyles(image).innerHTML : '') + clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = $('.newsdate').text().split(' | ');
            return {
                created: new Date(parsedData[1].replace(/\./g, '/')),
                lastModified: undefined
            };
        })(),
        reporters: (() => {
            const parsedData = $('.newsdate').text().split(' | ');
            const reporter = parsedData[parsedData.length - 1].split('\xA0'); // Non-breaking space
            return [{
                name: reporter[0],
                mail: reporter[1]
            }];
        })()
    };
}
