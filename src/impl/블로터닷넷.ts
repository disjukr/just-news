import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#move-to-top, #selectionSharerPopover, #selectionSharerPopunder, #fb-root').remove();
}

export function parse(): Article {
    const $author = $('[itemprop="author"] a');
    return {
        title: document.title,
        subtitle: undefined,
        content: (() => {
            const content = $('.pf-content')[0].cloneNode(true);
            $('.printfriendly', content).remove();
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date(document.querySelector('meta[property="article:published_time"]')!.textContent!),
            lastModified: new Date(document.querySelector('meta[property="article:modified_time"]')!.textContent!)
        },
        reporters: [{
            name: $author.text(),
            mail: $author.attr('href')
        }]
    };
}
