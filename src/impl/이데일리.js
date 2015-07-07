import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.newstitle').text();
    jews.subtitle = $('.subtitle').html() || undefined;
    jews.content = (function () {
        var content = $('#viewcontent_inner')[0].cloneNode(true);
        var image = $('#imgReTouchLoc_1');
        if (image[0]) {
            image = image[0].cloneNode(true);
            $('.gal', image).remove();
        }
        $('.stocksise', content).each(function (i, el) {
            $(el).replaceWith($('b', el).text());
        });
        return (image ? clearStyles(image).innerHTML : '') + clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.newsdate').text().split(' | ');
        return {
            created: new Date(parsedData[1].replace(/\./g, '/')),
            lastModified: undefined
        };
    })();
    jews.reporters = (function () {
        var parsedData = $('.newsdate').text().split(' | ');
        var reporter = parsedData[parsedData.length - 1].split('\xA0'); // Non-breaking space
        return [{
            name: reporter[0],
            mail: reporter[1]
        }];
    })();
    return jews;
}
