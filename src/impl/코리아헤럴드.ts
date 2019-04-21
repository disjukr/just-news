import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('.nview .title_sec').text(),
        subtitle: $('.nview .stitle_sec').text() || undefined,
        content: clearStyles($('#articleText')[0].cloneNode(true)).innerHTML,
        timestamp: (() => {
            const parsedData = $('.nview .writedata .date').contents();
            return {
                created: new Date(parsedData.eq(0).text().trim().replace('Published : ', '').replace(/-/g, '/')),
                lastModified: new Date(parsedData.eq(2).text().trim().replace('Updated : ', '').replace(/-/g, '/'))
            };
        })(),
        reporters: []
    };
}
