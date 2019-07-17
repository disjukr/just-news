import * as $ from 'jquery';

import {
    Article,
    ReadyToParse,
} from '..';
import {
    clearStyles,
    parseTimestamp,
} from '../util';

export const readyToParse: ReadyToParse = wait => wait('.articleUpDownArea');

export function parse(): Article {
    return {
        title: $('.articleSubecjt').text(),
        content: (() => {
            const content = $('#realArtcContents')[0].cloneNode(true) as HTMLElement;
            $('script', content).remove();
            const $articleMedia = $('.articleMedia');
            if ($articleMedia.length) {
                for (const articleMedia of $articleMedia) {
                    $(content).prepend(articleMedia.cloneNode(true) as HTMLElement);
                }
            }
            const relatedReportsTextNode = Array.from(content.childNodes).find(node => node.textContent === '◆ 관련 리포트');
            if (relatedReportsTextNode) {
                for (const node of nextAll(relatedReportsTextNode)) $(node).remove();
                $(relatedReportsTextNode).remove();
            }
            content.querySelectorAll('a[href]').forEach(node => {
                const parentToRemove = node.parentNode;
                if (parentToRemove && parentToRemove !== content) {
                    parentToRemove.parentNode!.removeChild(parentToRemove);
                } else {
                    node.remove();
                }
            })
            return clearStyles(content).innerHTML;
        })(),
        timestamp: parseTimestamp($('.articleInfo').text()),
    }
}

function nextAll(node: Node): Node[] {
    const result: Node[] = [];
    while (node.nextSibling) {
        node = node.nextSibling;
        result.push(node);
    }
    return result;
}
