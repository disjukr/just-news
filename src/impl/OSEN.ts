import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('#container .detailTitle .obj').text().trim(),
        content: (() => {
            let content = $('#_article')[0].cloneNode(true);
            $('iframe, #divBox, #scrollDiv, div[class^=tabArea], .mask_div, .articleList', content).remove();
            $('a', content).each((_, anchor) => {
                $(anchor).replaceWith($(anchor)[0].innerHTML);
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date(/\d{4}.\d\d.\d\d\s+\d\d:\d\d/.exec($('#container .writer').text())![0].replace(/\./g, '/')),
            lastModified: undefined
        },
        reporters: (() => {
            let mail: any = $('#container .detailLink a[href^=mailto]');
            if (mail.length > 0)
                mail = mail.attr('href').substr('mailto:'.length);
            return [{
                name: $('#container .writer').text().split(/\s+/)[1],
                mail: mail || undefined
            }];
        })()
    };
}