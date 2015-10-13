import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.hboxtitle').text().trim();
    jews.subtitle = $('.hboxsubtitle').text().trim();
    jews.content = clearStyles($('#news_body_area')[0].cloneNode(true)).innerHTML;
    jews.timestamp = {
        created: new Date($('.hboxbylinedata span').text().trim().replace(/\./g, '-').replace(/\s+/, 'T')+'+09:00'),
        lastModified: undefined
    };
    jews.reporters = [{
        name: $('.hboxbylinedata a').text(),
        mail: undefined
    }];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
