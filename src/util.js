export function clearStyles(element) {
    Array.prototype.forEach.call(element.querySelectorAll('*[style]'), function (child) {
        child.removeAttribute('style');
    });
    Array.prototype.forEach.call(element.querySelectorAll('img'), function (image) {
        image.removeAttribute('width');
        image.removeAttribute('height');
        image.removeAttribute('border');
    });
    Array.prototype.forEach.call(element.getElementsByTagName('table'), function (table) {
        table.removeAttribute('width');
        table.removeAttribute('height');
    });
    return element;
}
