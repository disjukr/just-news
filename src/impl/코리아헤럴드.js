import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.nview .title_sec').text();
    jews.subtitle = $('.nview .stitle_sec').text() || undefined;
    jews.content = clearStyles($('#articleText')[0].cloneNode(true)).innerHTML;
    jews.timestamp = (function () {
        var parsedData = $('.nview .writedata .date').contents();
        return {
            created: new Date(parsedData.eq(0).text().trim().replace('Published : ', '').replace(/-/g, '/')),
            lastModified: new Date(parsedData.eq(2).text().trim().replace('Updated : ', '').replace(/-/g, '/'))
        };
    })();
    jews.reporters = [];
    return jews;
}
