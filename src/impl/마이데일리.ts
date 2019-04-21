import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('.read_view_wrap dt').text(),
        content: (() => {
            let content = $('#article')[0].cloneNode(true);
            $('div.mask_div, div[align="center"][style="margin-left:14px"], div[style="float:right; width:200px; height:200px; margin:0 !important; padding:0 !important; background:#fff; border:1px solid #ccc;"]', content).remove();
            $('iframe[src^="../../ad"]', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date(('20' + $('.read_view_date').text()).replace(/-/g, '/')),
            lastModified: undefined
        },
        reporters: [],
    };
}
