import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.titGroup h4').text();
    jews.subtitle = $('titGroup h5').text().trim();
    var content = $($('#article-body')[0].cloneNode(true));
    $('.article-ad-align-left', content).remove();
    jews.content = clearStyles(content[0]).innerHTML;
    jews.timestamp = (function () {
        var parsedData = $('.newsStoryDetail .author .writeOption p').contents();
        var created = parsedData[0] || undefined;
        var lastModified = parsedData[2] || undefined;
        if (created) {
            created = new Date(created.textContent.replace('등록 : ', '').replace(/\./g, '/'));
        }
        if (lastModified) {
            lastModified = new Date(lastModified.textContent.replace('수정 : ', '').replace(/\./g, '/'));
        }
        return {
            created: created,
            lastModified: lastModified
        };
    })();
    jews.reporters = (function () {
        var name = $('.newsStoryDetail .author .authorInfo').text().trim().split(/\s+/).join(' ') || undefined;
        var mail = $('.newsStoryDetail .author .authorLink a[href^="mailto:"]');
        if (mail) {
            return [{
                name: name,
                mail: mail.attr('href').replace('mailto:', '')
            }];
        } else {
            return [{
                name: name,
                mail: undefined
            }];
        }
    })();
    return jews;
}
