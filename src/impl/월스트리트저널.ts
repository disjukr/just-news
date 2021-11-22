import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: $('.articleHeadlineBox h1')[0].textContent,
        content: (() => {
            const remove = (e: any) => {
                e.parentNode.removeChild(e);
            }
            const article = document.createElement('div');
            article.innerHTML = $('.articlePage')[0].innerHTML.split(/\s*<!--\s*article\s*[a-z]+\s*-->\s*/i)[1];
            //?
            Array.prototype.forEach.call(article.querySelectorAll('.socialByline, .insetCol3wide'), (v: any) => { v.remove(); });
            Array.prototype.forEach.call(article.getElementsByTagName('p'), (v: any, i: any, arr: any) => {
                if (/기사 번역 관련 문의: [A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i.exec(v.textContent)) {
                    while (arr[i])
                        remove(arr[i]);
                }
            });
            const daum_img = article.querySelectorAll('img[src*="//cp.news.search.daum.net"]')[0];
            if (daum_img) {
                remove(daum_img);
            }
            return clearStyles(article).innerHTML;
        })(),
        timestamp: {
            created: new Date($('.articleHeadlineBox .dateStamp')[0].textContent!.replace(/\s*KST\s*$/, ' +0900').replace(/(\d+)\.?\s+([a-z]{3})[a-z]+\s+(\d+)\s*,\s*/i, '$1 $2 $3 ')), /* RFC 2822 */
            lastModified: undefined
        },
        reporters: (() => {
            const byline = $('.socialByline .byline')[0];
            if (byline) {
                return [{
                    name: byline.textContent!.trim().replace(/^by\s+/i, ''),
                    mail: undefined
                }];
            } else {
                return [{
                    name: $('.socialByline .popTrigger').text(),
                    mail: $('.socialByline .socialTools .email').text()
                }];
            }
        })()
    };
}
