import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('#article-title').text();
    jews.subtitle = $('#article-subtitle').text();
    var content = $($('#article-body')[0].cloneNode(true));
    $('.article-ad-align-left', content).remove();
    jews.content = clearStyles(content[0]).innerHTML;
    jews.timestamp = {
        created: new Date($('#date-registered').text().replace('등록: ', '').replace(/\./g, '/')),
        lastModified: new Date($('#date-edited').text().replace('수정: ', '').replace(/\./g, '/'))
    };
    jews.reporters = (function () {
        var name = $('#article-info .author .author a').text();
        var mail;
        if (name !== '') {
            var parsedData = /\S+@\S+/.exec($('#article-body').contents().eq(-1).text().trim());
            if (parsedData !== null) {
                mail = parsedData[0];
            }
            return [{
                name: name,
                mail: mail
            }];
        } else {
            return [];
        }
    })();
}