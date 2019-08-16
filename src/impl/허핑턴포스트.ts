import * as $ from 'jquery';
import { clearStyles, matchAll, parseTimestamp } from '../util';
import { Article, ReadyToParse } from '..';

export const readyToParse: ReadyToParse = wait => wait('.tag-cloud');

export const cleanup = () => {
    const $share = $('a[href*="mailto"]');
    if ($share.length) {
        $($share[0].parentNode!).remove();
    }
    $('.pinitshareimage').remove();
    $('.ad_wrapper').remove();
    $('.hp-slideshow-wrapper').remove();
    $('.thumbBlock_holder').remove();
}

export function parseHuffDatetime(rawText: string): Timestamp {
    const timestamp: Timestamp = {};
    const regex = /(\d{4})년 (\d{1,2})월 (\d{1,2})일 (\d{1,2})시 (\d{1,2})분 KST/g;
    const [createdText, lastModifiedText] = matchAll(rawText, regex);

    if (createdText) timestamp.created = parseTimestamp.getDate(createdText);
    if (lastModifiedText) timestamp.lastModified = parseTimestamp.getDate(lastModifiedText);

    return timestamp;
}

export function parse(): Article {
    return {
        title: $('h1.headline__title').text(),
        subtitle: $('h2.headline__subtitle').text(),
        content: (() => {
            const content = $($('div.entry__body')[0].cloneNode(true));
            $('.ad_spot', content).remove();

            return clearStyles(content[0]).innerHTML;
        })(),
        timestamp: parseHuffDatetime($('div.timestamp').text()),
        reporters: (() => {
            const nameElements = $('span.author-card__details__name');
            if (nameElements) {
                const name = nameElements[1].innerText;
                const mailText = $('span.author-card__microbio').text();
                const mailRegex = /([^\s]+@[^\s]+)/;
                const mail = mailRegex.exec(mailText);

                return [{
                    name,
                    mail: mail && mail[0],
                }];
            }
            return [];
        })()
    };
}
