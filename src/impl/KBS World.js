import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = document.getElementById('content_area').getElementsByClassName('title')[0].getElementsByTagName('h2')[0].textContent;
    jews.subtitle = undefined;
    jews.content = (function () {
        var photo = document.getElementById('container').getElementsByClassName('photo')[0];
        var content = document.getElementById('content').cloneNode(true);
        if (photo !== undefined)
            content.insertBefore(photo.getElementsByTagName('img')[0], content.firstChild);
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = document.getElementById('content_area').getElementsByClassName('title')[0].getElementsByTagName('em');
        var lastModified;
        if (parsedData.length > 1) {
            lastModified = new Date(parsedData[1].textContent.replace(/-/g, '/'));
        }
        return {
            created: new Date(parsedData[0].textContent.replace(/-/g, '/')),
            lastModified: lastModified
        };
    })();
    jews.reporters = [];
    return jews;
}
