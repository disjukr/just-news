import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('.sec_subject .subject_area').text();
    jews.content = clearStyles($('#cont_newstext')[0].cloneNode(true)).innerHTML;
    jews.reporters = [{
        name: $('.sec_subject .source').text()
    }];
    return jews;
}
