import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = document.querySelector('#GS_TitleGroup > .newstitle').innerHTML.replace(/<!--\/?DCM_TITLE-->/g, '').trim();
    jews.subtitle = document.querySelector('#GS_TitleGroup > .subtitle').innerHTML.replace(/<!--\/?DCM_SUBTITLE-->/g, '').trim() || undefined;
    jews.content = (function () {
        var content = document.getElementById('GS_Content').cloneNode(true);
        [].forEach.call(content.querySelectorAll('#frm_AD_GISA_PHOTO_LINE, #AD_GISA_PHOTO_LINE'), function (v) {
            v.parentNode.removeChild(v);
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = document.getElementById('copyright').textContent;
        var createdMatch = parsedData.match(/입력시간 : (\d+\/\d+\/\d+\s+\d+:\d+:\d+)/);
        var lastModifiedMatch = parsedData.match(/수정시간 : (\d+\/\d+\/\d+\s+\d+:\d+:\d+)/);
        var created;
        var lastModified;
        if (createdMatch) {
            created = new Date(createdMatch[1]);
        }
        if (lastModifiedMatch) {
            lastModified = new Date(lastModifiedMatch[1]);
        }
        return {
            created: created,
            lastModified: lastModified
        };
    })();
    jews.reporters = (function () {
        var parsedData = document.querySelector('#GS_TitleGroup > .report');
        var name = [].slice.call(parsedData.childNodes).filter(function (v) {
            return v.nodeType === 3;
        }).map(function (v) {
            return v.textContent;
        }).join().trim();
        var mail = parsedData.querySelector('a').getAttribute('href').replace('mailto:', '');

        return [{
            name: name,
            mail: mail
        }];
    })();
    return jews;
}
