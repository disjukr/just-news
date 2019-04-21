import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#scrollDiv').remove();
}

export function parse(): Article {
    let articleBody = clearStyles($('.article-text')[0].cloneNode(true));
    let $subtitle = $('.subtitle', articleBody);
    const subtitle = $subtitle.html();
    $subtitle.remove();
    $('.relation2-area', articleBody).remove();
    const content = articleBody.innerHTML;
    return {
        title: $('#article_view_headline .title').text().trim(),
        content: content,
        subtitle: subtitle,
        timestamp: (() => {
            let $span = $('#article_view_headline .date-time span');
            if ($span[0].childNodes[1].textContent!.replace(/-/g, '/'))
                return {
                    created: new Date($span[0].childNodes[1].textContent!.replace(/-/g, '/')),
                    lastModified: $span[1] ? new Date($span[1].childNodes[1].textContent!.replace(/-/g, '/')) : undefined
                };
            else return undefined;
        })(),
        reporters: []
    };
}
