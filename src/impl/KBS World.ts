import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: document.getElementById('content_area')!.getElementsByClassName('title')[0].getElementsByTagName('h2')[0].textContent,
        content: (() => {
            const photo = document.getElementById('container')!.getElementsByClassName('photo')[0];
            const content = document.getElementById('content')!.cloneNode(true);
            if (photo !== undefined)
                content.insertBefore(photo.getElementsByTagName('img')[0], content.firstChild);
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = document.getElementById('content_area')!.getElementsByClassName('title')[0].getElementsByTagName('em');
            let lastModified;
            if (parsedData.length > 1) {
                lastModified = new Date(parsedData[1].textContent!.replace(/-/g, '/'));
            }
            return {
                created: new Date(parsedData[0].textContent!.replace(/-/g, '/')),
                lastModified: lastModified
            };
        })(),
        reporters: [],
    }
}
