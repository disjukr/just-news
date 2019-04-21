import * as $ from 'jquery';
import { Article } from '..';
import { clearStyles, waitElement } from '../util';

export const readyToParse = () => waitElement('.name span');

export function parse(): Article {
    return {
        title: $('.landing-caption .tit-s').text(),
        content:
            $('script').filter((_, scriptTag) => {
                if(scriptTag.innerHTML.includes('displayVod')) { return scriptTag }
            }).map((_, element) => element.outerHTML).get().join(' ') + //video runtime script
            $('.detail-visual')[0].outerHTML + '<br>' + //video control elements
            clearStyles($('#cont_newstext')[0].cloneNode(true) as HTMLElement).innerHTML,
        reporters :[{
            name: $('.name span:eq(0)').text(),
            mail: $('.name span:eq(1)').text()
        }]
    };
}
