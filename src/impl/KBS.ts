import * as $ from 'jquery';
import { Article } from 'index';
import { clearStyles, waitElement } from '../util';

export const readyToParse = () => waitElement('.name span');

export function parse(): Article {
    return {
        title: $('.landing-caption .tit-s').text(),
        content: (() => {
          const ret =
            $('script').filter((_, scriptTag) => {
              if(scriptTag.innerHTML.includes('displayVod')) { return scriptTag }
            }).map((_, element) => {
              return element.outerHTML
            }).get().join(' ') +
            $('.detail-visual')[0].outerHTML + '<br>' +
            clearStyles($('#cont_newstext')[0].cloneNode(true) as HTMLElement).innerHTML
          return ret;
        })(),
        reporters :[{
            name: $('.name span:eq(0)').text(),
            mail: $('.name span:eq(1)').text()
        }]
    };
}
