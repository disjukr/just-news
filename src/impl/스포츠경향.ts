import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Article {
    return {
        title: document.querySelector('.newsWrap > .viewHeader > .tit_subject')!.textContent,
        content: (() => {
            const content = document.getElementById('_article')!.cloneNode(true);
            //?
            [].forEach.call((<HTMLElement>content).querySelectorAll('#divBox, #article_bottom_ad, .khwidgetWrap, .social_widget'), (v: any) => {
                v.parentNode.removeChild(v);
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = document.querySelector('.newsWrap > .viewHeader > .newsInfo > .time')!.textContent!;
            const created = parsedData.replace('입력: ', '').replace(/(\d+)년\s*(\d+)월\s*(\d+)일\s*([\d:]+)/g, (_, year, month, day, time) => {
                return year + '/' + month + '/' + day + ' ' + time;
            });
            return {
                created: new Date(created),
                lastModified: undefined
            };
        })(),
        reporters: (() => {
            const parsedData = document.querySelector('.newsWrap > .viewHeader > .newsInfo > .info_part')!.textContent!;
            const matches = parsedData.match(/[^\s]+@.+/);
            if (matches) {
                return [{
                    name: parsedData.split(matches[0])[0].trim(),
                    mail: matches[0]
                }];
            } else {
                return [{
                    name: parsedData,
                    mail: undefined
                }];
            }
        })()
    };
}
