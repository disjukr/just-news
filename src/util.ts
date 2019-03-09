import * as $ from 'jquery';

export const endlessWaiting = new Promise(() => {});

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

export function waitElement(selector: string): Promise<void> {
    return new Promise(resolve => {
        const i = setInterval(() => {
            if ($(selector).length > 0) {
                clearInterval(i);
                resolve();
            }
        }, 100);
    });
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
