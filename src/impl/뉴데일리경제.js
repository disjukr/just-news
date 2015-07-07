import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    var $ = function (b) { return document.querySelector(b); },
        a = [].slice.call($('.arvdate').childNodes).filter(function (v) { return v.nodeType === 3; })[0].textContent.trim();
    jews.title = $('.hbox>h2').textContent.trim();
    jews.subtitle = $('.hbox>h3').textContent.trim();
    jews.reporters = [{
        'name': $('.arvdate>a').textContent.replace('뉴데일리경제', '').trim(),
        'mail': a.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i)[0]
    }];
    jews.timestamp = {
        'created': new Date(a.match(/\d{4}\.\d{2}.\d{2}\s+\d{2}:\d{2}:\d{2}/)[0].replace(/\./g, '-').replace(/\s+/, 'T') + '+09:00'), // ISO 8601
        'lastModified': undefined
    };
    jews.content = clearStyles(document.getElementById('news_body_area')).innerHTML;
}