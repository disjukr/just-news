import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#article_view_headline .title').text().trim();
    { // content, subtitle
        let articleBody = clearStyles($('.article-text')[0].cloneNode(true));
        let $subtitle = $('.subtitle', articleBody);
        jews.subtitle = $subtitle.html();
        $subtitle.remove();
        jews.content = articleBody.innerHTML;
    }
    jews.timestamp = (function () {
        let $span = $('#article_view_headline .date-time span');
        if ($span[0].childNodes[1].textContent.replace(/-/g, '/'))
        return {
            created: new Date($span[0].childNodes[1].textContent.replace(/-/g, '/')),
            lastModified: $span[1] ? new Date($span[1].childNodes[1].textContent.replace(/-/g, '/')) : undefined
        };
    })();
    jews.reporters = [];
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
    return jews;
}
