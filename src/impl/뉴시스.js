import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.viewnewstitle').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#articleBody')[0].cloneNode(true);
        var centerImage = $('.center_img')[0];
        // $('.relatednews', content).remove();
        if (centerImage) {
            return clearStyles(centerImage.cloneNode(true)).innerHTML + clearStyles(content).innerHTML;
        }
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var $time = $('font', $('.viewnewstitle').closest('tbody'));
        return {
            created: new Date($time.eq(0).text().replace(/\[|\]/g, '').replace(/-/g, '/')),
            lastModified: $time.eq(1).text() ? new Date($time.eq(1).text().replace(/\[|\]/g, '').replace(/-/g, '/')) : undefined
        };
    })();
    jews.reporters = [];
    return jews;
}
