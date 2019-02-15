import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('#view_titlebox .view_titlebox_r1').text(),
        subtitle: $('#view_titlebox .view_subtitle')[0].innerHTML.trim(),
        content: (() => {
            const content = $($('#view_con')[0].cloneNode(true));
            $('a.dklink', content).each(function (i, el) {
                $(el).replaceWith(el.textContent);
            });
            $('.contents_img', content).each(function (i, el) {
                el.removeAttribute('width');
            });
            return clearStyles(content[0]).innerHTML;
        })(),
        timestamp: {
            created: new Date($('#view_titlebox2_3 span').text().replace('등록 : ', '').replace(/-/g, '/')),
            lastModified: undefined
        },
        reporters: (() => {
            const parsedData = $('#view_page .view_title_sub').eq(0).contents()[0].textContent.trim();
            const matches = parsedData.match(/(.*)\((.*)\)/);
            return [{
                name: matches[1],
                mail: matches[2]
            }];
        })(),
    };
}
