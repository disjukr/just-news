import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article, ReadyToParse } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
    $('.iwmads').remove();
    document.onmousedown = null;
    (<any>window)._cz_mouseClick = null;
};

export const readyToParse: ReadyToParse = wait => wait('.reporter_list');

export function parse(): Article {
    return {
        title: $('.news_head h1').text().trim(),
        subtitle: $('.news_head p.summary').text().trim() || undefined,
        content: (() => {
	    const content = $('#articleBody')[0].cloneNode(true);
            $('.news_box', content).remove();
            $('.view_ad', content).remove();
	    $('h2', content).filter((_, el) => $(el).text() == "관련기사").remove();
            return $(content).html();
        })(),
        timestamp: (() => {
	    let articleDate: any = $('.news_head .meta span').text().replace("입력:", "").replace("수정:", "").split(" -- ")
            let created: any = articleDate[0].trim().replace(/\//g, "-").replace(/\s+/, "T")
            let lastModified: any = articleDate[1].trim().replace(/\//g, "-").replace(/\s+/, "T") 

            return {
                created: new Date(created),
                lastModified: new Date(lastModified)
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
