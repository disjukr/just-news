import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#article-title').text();
    jews.subtitle = undefined;
    jews.content = clearStyles($('#article-body')[0].cloneNode(true)).innerHTML;
    jews.timestamp = {
        created: undefined,
        lastModified: undefined
    };
    jews.reporters = [];
    jews.cleanup = function () {
        $('iframe, [id^=goog], [id^=popIn_menu]').remove();
    };
    return jews;
}
