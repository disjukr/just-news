import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#ArticleVTitle').text();
    jews.subtitle = $('#ArticleVSubject').text();
    jews.content = (function() {
        var newsContent = $('#ArticleVContent')[0].cloneNode(true);
        $('#ArticleVAdvert', newsContent).remove();
        return clearStyles(newsContent).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#ArticleVDate').text().trim().replace(/-/g,'/')),
        lastModified: undefined
    };
    jews.reporters = (function() {
        var reporters = $('#ArticleVName')[0].cloneNode(true);
        $('.goTop', reporters).remove();
        return [{
            name: clearStyles(reporters).innerHTML,
            mail: undefined
        }];
    })();
    return jews;
}
