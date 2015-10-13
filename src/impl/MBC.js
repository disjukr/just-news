import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#content .view-title').text();
    jews.subtitle = undefined;
    jews.content = clearStyles($('#DivPrint .view-con')[0].cloneNode(true)).innerHTML;
    jews.timestamp = {
        created: new Date($('#DivPrint .article-time-date').text().replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [{
        name: $('#DivPrint .reporter').text().trim().split(/\s+/)[0],
        mail: undefined
    }];
    return jews;
}
