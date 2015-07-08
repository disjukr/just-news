import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#viewTitle h2').text();
    jews.subtitle = undefined;
    var content = $($('#viewContent_3')[0].cloneNode(true));
    $('div>iframe', content).remove();
    $('.tt-wrapper', content).remove();
    jews.content = clearStyles(content[0]).innerHTML;
    jews.timestamp = {
        created: new Date($('.writeDate').text().replace('입력 : ', '').replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var parsedData = $('.journalist_mail').contents();
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
    })();
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
