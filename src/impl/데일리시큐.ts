import { clearStyles } from '../util';
import { Article } from 'index';

export default function parse(): Article {
    let jews = {};
    jews.title = document.querySelector('.new_title').textContent.trim();
    jews.subtitle = document.querySelector('.news_mtitle').textContent.trim();
    jews.content = clearStyles(document.querySelector('.news_text')).innerHTML;

    var infos = document.querySelector('.new_write').textContent.split(',');

    jews.timestamp = {
        created: new Date(infos[0].trim().replace('등록 : ', '').replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [{
        name: /데일리시큐 (.*)기자/.exec(infos[1])[1],
        mail: infos[2].trim()
    }];
    return jews;
}
