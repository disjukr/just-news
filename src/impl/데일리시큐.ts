import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Article {
    const infos = $('.new_write').text().split(',');
    return {
        title: $('.new_title').text().trim(),
        subtitle: $('.news_mtitle').text().trim(),
        content: clearStyles($('.news_text')[0].cloneNode(true)).innerHTML,
        timestamp: {
            created: new Date(infos[0].trim().replace('등록 : ', '').replace(/-/g, '/')),
            lastModified: undefined
        },
        reporters: [{
            name: /데일리시큐 (.*)기자/.exec(infos[1])[1],
            mail: infos[2].trim()
        }]
    };
}
