import $ from 'jquery';

import {
    Article,
    ReadyToParse,
} from '..';
import {
    clearStyles,
} from '../util';


export const readyToParse: ReadyToParse = wait => wait('#articleBody');

export const cleanup = () => $('#scrollDiv, iframe').remove();

export function parse(): Article {
    const title = $('.title')[0].cloneNode(true);
    const reporter = $('.byline_wrap', title);
    reporter.remove();
    const reporterText = reporter.text();
    return {
        title: (() => {
            return $(title).text().trim();
        })(),
        content: (() => {
            const articleBodyElement = $('.article_txt')[0].cloneNode(true) as HTMLElement;
            return clearStyles(articleBodyElement).innerHTML;
        })(),
        timestamp: (() => {
            const times = $('.article_date');
            return {
                created: new Date(times[0].childNodes[0].textContent!.trim().replace(/\./g, "-")),
            };
        })(),
        reporters: (() => {
            if (!reporterText) {
                return [];
            }
            const seperator = reporterText.lastIndexOf(" ");
            return [{
                name: reporterText.substr(0, seperator),
                mail: reporterText.substr(seperator),
            }];
        })(),
    };
}
