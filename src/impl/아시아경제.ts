import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: document.getElementById('content')!.getElementsByClassName('area_title')[0].getElementsByTagName('h1')[0].textContent,
        content: (() => {
            const content = <HTMLElement>document.getElementById('bodyContents')!.getElementsByClassName('txt')[0].cloneNode(true);
            //?
            Array.prototype.forEach.call(content.getElementsByTagName('iframe'), (iframe: any) => {
                iframe.parentElement.removeChild(iframe);
            });
            Array.prototype.forEach.call(content.querySelectorAll('[class^=view_ad], .google_ad, .e_article'), (ad: any) => {
                ad.parentElement.removeChild(ad);
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = document.getElementById('content')!.getElementsByClassName('area_title')[0].getElementsByTagName('p')[0].textContent!;
            return {
                created: new Date(parsedData.match(/기사입력\s+(\d+\.\d+\.\d+\s+\d+:\d+)/)![1].replace(/\./g, '/')),
                lastModified: new Date(parsedData.match(/최종수정\s+(\d+\.\d+\.\d+\s+\d+:\d+)/)![1].replace(/\./g, '/'))
            };
        })(),
        reporters: []
    };
}
