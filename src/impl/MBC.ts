import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Article {
    return {
        title: $('#content .view-title').text(),
        content: clearStyles($('#DivPrint .view-con')[0].cloneNode(true)).innerHTML,
        timestamp: {
            created: new Date($('#DivPrint .article-time-date').text().replace(/-/g, '/')),
            lastModified: undefined
        },
        reporters: [{
            name: $('#DivPrint .reporter').text().trim().split(/\s+/)[0],
            mail: undefined
        }]
    };
}
