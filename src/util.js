export function clearStyles(element) {
    if (element.jquery) {
        throw new Error('`clearStyles` 함수는 인자로 DOM element만 받습니다.');
    }

    try {
        Array.prototype.forEach.call(element.querySelectorAll('*[style]'), (child) => {
            child.removeAttribute('style');
        });
        Array.prototype.forEach.call(element.querySelectorAll('img'), (image) => {
            image.removeAttribute('width');
            image.removeAttribute('height');
            image.removeAttribute('border');
        });
        Array.prototype.forEach.call(element.getElementsByTagName('table'), (table) => {
            table.removeAttribute('width');
            table.removeAttribute('height');
        });
    } catch (err) {
        console.error('스타일 청소에 실패하였습니다.');
        console.error('`article.content`를 처리하는 부분이 의심됩니다.');
        console.error('청소하려던 element:', element);
        console.error('에러:', err);
    }

    return element;
}
