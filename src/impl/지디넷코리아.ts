import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    $('#scrollDiv').remove();
    document.onmousedown = null;
    (<any>window)._cz_mouseClick = null;
};

export function parse(): Article {
    return {
        title: $('.m_container .sub_view_tit2 h2').text().trim(),
        subtitle: $('.m_container .sub_view_tit2 p').text().trim() || undefined,
        content: (() => {
            const content = $('.m_container .sub_view_cont')[0].cloneNode(true);
            $('.view_ad', content).remove();
            $('[align]', content).each((_, v: HTMLElement) => {
                v.removeAttribute('align');
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            let created: any = $('.m_container .sub_view_tit3 .tit3_2 span').text().replace('입력 : ', '').replace(/\./g, '/');
            let lastModified: any = $('.m_container .sub_view_tit3 .tit3_3 span').text().replace('수정 : ', '').replace(/\./g, '/');
            let timeIndex;

            timeIndex = created.lastIndexOf('/');
            created = new Date(created.substring(0, timeIndex) + ' ' + created.substring(timeIndex + 1));
            timeIndex = lastModified.lastIndexOf('/');
            lastModified = new Date(lastModified.substring(0, timeIndex) + ' ' + lastModified.substring(timeIndex + 1));
            return {
                created: created,
                lastModified: lastModified
            };
        })(),
        reporters: (() => {
            const name = $('.m_container .sub_view_tit3 .tit3_1 span').text();
            const mail = $('.journalist_1 span a').text().trim() || undefined;
            return [{
                name: name,
                mail: mail
            }];
        })()
    };
}
