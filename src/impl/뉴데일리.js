import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    var titleData = document.getElementById('titlebox');
    var articleData = document.getElementById('ndArtOption');
    jews.title = titleData.getElementsByTagName('h1')[0].textContent;
    jews.subtitle = (function () {
        var h3 = titleData.getElementsByTagName('h3')[0].textContent;
        var h2 = titleData.getElementsByTagName('h2')[0].textContent;
        if (h3) {
            return h3 + '<br>' + h2;
        } else {
            return h3;
        }
    })();
    jews.content = document.getElementById('ndArtBody').innerHTML
                        .split(/<!--.+?기사본문\s*하단.+?-->/)[0].trim()
                        .replace(/(?:style|width|height)=(?:"[^"]+?"|'[^']+?')/g, '').replace(/<p><br><\/p>/g, '');
    jews.timestamp = {
        'created': undefined,
        'lastModified': new Date(articleData.childNodes[1].textContent.trim().replace(/\./g, '-').replace(' ', 'T') + '+09:00') // ISO 8601
    };
    jews.reporters = [{
        'name': articleData.childNodes[2].textContent.trim(),
        'mail': articleData.querySelectorAll('a[href^="mailto:"]')[0].textContent.trim()
    }];
}