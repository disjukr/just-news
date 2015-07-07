import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = document.getElementById('content').getElementsByClassName('area_title')[0].getElementsByTagName('h1')[0].textContent;
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = document.getElementById('bodyContents').getElementsByClassName('txt')[0].cloneNode(true);
        Array.prototype.forEach.call(content.getElementsByTagName('iframe'), function (iframe) {
            iframe.parentElement.removeChild(iframe);
        });
        Array.prototype.forEach.call(content.querySelectorAll('[class^=view_ad], .google_ad, .e_article'), function (ad) {
            ad.parentElement.removeChild(ad);
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = document.getElementById('content').getElementsByClassName('area_title')[0].getElementsByTagName('p')[0].textContent;
        return {
            created: new Date(parsedData.match(/기사입력\s+(\d+\.\d+\.\d+\s+\d+:\d+)/)[1].replace(/\./g, '/')),
            lastModified: new Date(parsedData.match(/최종수정\s+(\d+\.\d+\.\d+\s+\d+:\d+)/)[1].replace(/\./g, '/'))
        };
    })();
    jews.reporters = [];
    return jews;
}
