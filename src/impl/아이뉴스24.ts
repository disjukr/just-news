import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    $('#scrollDiv, #soeaFrame_, #soeaLayerLoc_st, #soeaLayerLoc_fi, iframe').remove();
}

export function parse(): Article {
    return {
        title: $('#content .title').text(),
        subtitle: $('#content .sub_title').text(),
        content: (() => {
            const content = $('#news_content')[0].cloneNode(true);
            $('a[href="javascript:search_gija();"]', content).remove();
            $('[id^=div-gpt-ad]', content).parent().remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date($('#content .info').text().replace(/(\d+)[^\d]+(\d+)[^\d]+(\d+)[^\d]+(\d+):(\d+)/, '$1/$2/$3 $4:$5')),
            lastModified: undefined
        },
        reporters: []
    };
}
