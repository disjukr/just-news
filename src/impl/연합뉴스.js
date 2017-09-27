import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#articleWrap h2').text() || $('#articleWrap h1').text() || undefined;
    jews.subtitle = $('.article .stit strong b').text() || undefined;
    jews.content = (function () {
        var content = $('.article')[0].cloneNode(true);
        $('.stit, .banner-0-wrap, .article_ban, .adrs, .article-ad-box', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.article .adrs .pblsh').text().replace(/\s*송고/, '')),
        lastModified: undefined
    };
    jews.reporters = [];
    return jews;
}
