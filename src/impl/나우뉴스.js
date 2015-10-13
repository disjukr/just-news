import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.atic_title div h3').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#articleContent')[0].cloneNode(true);
        $('#hnsIframe, #ifrm_photolink, table[width="250px"][height="250px"]', content).remove();
        var figure = $('table[align="center"]', content)[0];
        if (figure) {
            $('table div', figure).each(function (i, el) {
                $(el).replaceWith($('ul li', $(el))[0].innerHTML);
            });
        }
        $('a.dklink', content).each(function (i, el) {
            $(el).replaceWith(el.textContent);
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.atic_title .tdata').text().split('\u3163'); // Korean vowel 'ㅣ'
        return {
            created: new Date(parsedData[0].trim().replace('입력: ', '').replace(/\./g, '/')),
            lastModified: new Date(parsedData[1].trim().replace('수정 ', '').replace(/\./g, '/'))
        };
    })();
    jews.reporters = [];
    return jews;
}
