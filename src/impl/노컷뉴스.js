import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.reporter_info h2').text();
    jews.subtitle = $('.viewbox h3').text();
    jews.content = (function () {
        var content = $('#pnlContent')[0].cloneNode(true);
        $('.relatednews', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.reporter_info ul li:first-child span').text().replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [{
        name: $('.reporter_info .email span').text(),
        mail: $('.reporter_info .email a').attr('title')
    }];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
