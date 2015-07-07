import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('.article_headline').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#newsContent')[0].cloneNode(true);
        $('.articleAd_new, .hns_mask_div', content).remove();
        $('.playbt, .vState, .vodinfoButton', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#d_date').text().trim().replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('iframe, #scrollDiv, #content style').remove();
        $('.dklink').each(function (_, link) {
            $(link).replaceWith($(link).text());
        });
    };
}