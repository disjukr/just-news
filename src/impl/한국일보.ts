import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('.titGroup h4').text(),
        subtitle: $('titGroup h5').text().trim(),
        content: (() => {
            const content = $($('#article-body')[0].cloneNode(true));
            $('.article-ad-align-left', content).remove();
            return clearStyles(content[0]).innerHTML
        })(),
        timestamp: (() => {
            const parsedData = $('.newsStoryDetail .author .writeOption p').contents();
            let created: any = parsedData[0] || undefined;
            let lastModified: any = parsedData[2] || undefined;
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
        })(),
        reporters: (() => {
            const name = $('.newsStoryDetail .author .authorInfo').text().trim().split(/\s+/).join(' ') || undefined;
            const mail = $('.newsStoryDetail .author .authorLink a[href^="mailto:"]');
            if (mail) {
                return [{
                    name: name,
                    mail: mail.attr('href')!.replace('mailto:', '')
                }];
			}
			return [{
                    name: name,
                    mail: undefined
            }];
        })()
    };
}
