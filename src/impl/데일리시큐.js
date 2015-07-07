import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = document.querySelector('.new_title').textContent.trim();
    jews.subtitle = document.querySelector('.news_mtitle').textContent.trim();
    jews.content = clearStyles(document.querySelector('.news_text')).innerHTML;

    var infos = document.querySelector('.new_write').textContent.split(',');

    jews.timestamp = {
        created: new Date(infos[0].replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [{
        name: /데일리시큐 (.*)기자/.exec(infos[1])[1],
        mail: infos[2].trim()
    }];
}