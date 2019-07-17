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
            const footerStarter = Array.from(content.childNodes).find(node => {
                const text = $(node).text();
                return text.startsWith('▶') || text.startsWith('◆');
            });
            if (footerStarter) {
                for (const node of nextAll(footerStarter)) $(node).remove();
                $(footerStarter).remove();
            }
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
