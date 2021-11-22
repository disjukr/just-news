import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('#news_names h1').text(),
        subtitle: $('#news_names h3').text(),
        content: (() => {
            const content = $('#NewsAdContent')[0].cloneNode(true);
            $('a', content).each(function (_, anchor) {
                $(anchor).replaceWith($(anchor)[0].innerHTML);
            });
            $('[alt="DT Main"]', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = /입력: (....-..-.. ..:..)/.exec($('#news_names p').text());
            return {
                created: (parsedData === null) ? undefined : new Date(parsedData[1].replace(/-/g, '/')),
                lastModified: undefined
            };
        })(),
        reporters: [{
            name: $('#news_names p')[0].childNodes[0].textContent!.trim(),
            mail: $('#news_names p [href^=mailto]').text()
        }],
    };
}

export const cleanup = () => $('#soeaLayerLoc_fi').remove();
