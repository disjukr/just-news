import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    var titleData = $('#titlebox');
    jews.title = $('h1', titleData).text();
    jews.subtitle = (function () {
        var h3 = $('h3', titleData).text();
        var h2 = $('h2', titleData).text();
        if (h3) {
            return h3 + '<br>' + h2;
        } else {
            return h3;
        }
    })();
    var content = $('#ndArtBody')[0].cloneNode(true);
    $('#writerProfileCon ~ div', content).remove();
    $('#writerProfileCon', content).remove();
    jews.content = clearStyles(content).innerHTML;

    jews.timestamp = {
        created: undefined,
        lastModified: new Date($('.writeInfo').text().split('최종편집 ')[1].trim().replace(/\./g, '-').replace(' ', 'T') + '+09:00') // ISO 8601
    };
    console.log($('.writeInfo').text().split('최종편집 ')[1].trim().replace(/\./g, '-').replace(' ', 'T') + '+09:00');
    var reporter = $('#writerProfileCon');
    jews.reporters = [{
        name: $('.filetxt.mt12', reporter).text(),
        mail: $('.filetxtmail', reporter).text()
    }];
    return jews;
}
