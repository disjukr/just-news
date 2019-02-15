import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Article {
    return {
        title: $('.atic_title div h3').text(),
        content: (() => {
            const content = $('#articleContent')[0].cloneNode(true);
            $('#hnsIframe, #ifrm_photolink, table[width="250px"][height="250px"]', content).remove();
            const figure = $('table[align="center"]', content)[0];
            if (figure) {
                $('table div', figure).each(function (i, el) {
                    $(el).replaceWith($('ul li', $(el))[0].innerHTML);
                });
            }
            $('a.dklink', content).each(function (i, el) {
                $(el).replaceWith(el.textContent);
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            var parsedData = $('.atic_title .tdata').text().split('\u3163'); // Korean vowel 'ㅣ'
            return {
                created: new Date(parsedData[0].trim().replace('입력: ', '').replace(/\./g, '/')),
                lastModified: new Date(parsedData[1].trim().replace('수정 ', '').replace(/\./g, '/'))
            };
        })(),
        reporters: []
    };
}
