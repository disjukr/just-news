import * as $ from 'jquery';
import { Timestamp } from 'index';

export const endlessWaiting = new Promise<void>(() => {});

export function waitDOMContentLoaded(): Promise<void> {
    return new Promise(resolve => {
        switch (document.readyState) {
        case 'interactive': case 'complete': { resolve(); break; }
        default: {
            window.addEventListener('DOMContentLoaded', () => resolve());
        } break;
        }
    });
};

export function waitForSelector(selector: string): Promise<void> {
    return new Promise(resolve => {
        const i = setInterval(() => {
            if ($(selector).length > 0) {
                clearInterval(i);
                resolve();
            }
        }, 100);
    });
}

export function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function clearStyles(element: HTMLElement | Node) {
    if ('jquery' in element) {
        throw new Error('`clearStyles` 함수는 인자로 DOM element만 받습니다.');
    }
    const ele = element as HTMLElement;
    try {
        for (const child of Array.from(ele.querySelectorAll('*[style]'))) {
            child.removeAttribute('style');
        }
        for (const image of Array.from(ele.querySelectorAll('img'))) {
            image.removeAttribute('width');
            image.removeAttribute('height');
            image.removeAttribute('border');
        }
        for (const table of Array.from(ele.getElementsByTagName('table'))) {
            table.removeAttribute('width');
            table.removeAttribute('height');
        }
    } catch (e) {
        console.error('스타일 청소에 실패하였습니다.');
        console.error('`article.content`를 처리하는 부분이 의심됩니다.');
        console.error('청소하려던 element:', ele);
        console.error('에러:', e);
    }
    return ele;
}

export function getQueryParam(param: string, search: string = location.search): string {
    const searchParams = new URLSearchParams(search);
    return searchParams.get(param) || '';
}

/**
 * 작성일, 수정일이 들어있는 문자열을 파싱해서 Timestamp 객체를 반환합니다.
 * 이 함수는 입력 문자열에 작성일이 수정일보다 앞에 써있을거라고 가정합니다.
 */
export function parseTimestamp(text: string): Timestamp {
    const timestamp: Timestamp = {};
    const dateRegex = /(\d{4})[\.\s/\-]*(\d{1,2})[\.\s/\-]*(\d{1,2})\s*(?:(\d{1,2})[:\s]+(\d{1,2})(?:[:\s]+(\d{1,2}))?)/g;
    const [createdText, lastModifiedText] = matchAll(text, dateRegex);
    if (createdText) timestamp.created = parseTimestamp.getDate(createdText);
    if (lastModifiedText) timestamp.lastModified = parseTimestamp.getDate(lastModifiedText);
    return timestamp;
}
parseTimestamp.getDate = (fragments: string[]): Date => {
    const [, year, month, date, hour, minute, second] = fragments;
    const dateText = [year.padStart(4, '0'), month.padStart(2, '0'), date.padStart(2, '0')].join('-');
    if (!hour) return new Date(dateText);
    if (!second) return new Date(`${dateText}T${[hour, minute].map(t => t.padStart(2, '0')).join(':')}`);
    return new Date(`${dateText}T${[hour, minute, second].map(t => t.padStart(2, '0')).join(':')}`);
};

export function matchAll(text: string, regex: RegExp) {
    const result = [];
    let match;
    do {
        match = regex.exec(text);
        if (match) result.push(match);
    } while (match);
    return result;
}
