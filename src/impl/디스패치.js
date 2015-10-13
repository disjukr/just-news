import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = document.querySelector('.txtBox h4 a').textContent.trim();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = document.querySelector('.articleSingle').cloneNode(true);
        $('.txtBox', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var time_info = document.querySelector('.txtBox h6').textContent.trim();
        return {
            created: new Date(time_info.replace('기사입력 : ', '')),
            lastModified: undefined
        };
    })();
    jews.reporters = [];
    return jews;
}
