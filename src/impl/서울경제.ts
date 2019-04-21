import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    return {
        title: document.querySelector('#GS_TitleGroup > .newstitle')!.innerHTML.replace(/<!--\/?DCM_TITLE-->/g, '').trim(),
        subtitle: document.querySelector('#GS_TitleGroup > .subtitle')!.innerHTML.replace(/<!--\/?DCM_SUBTITLE-->/g, '').trim() || undefined,
        content: (() => {
            const content = document.getElementById('GS_Content')!.cloneNode(true);
            [].forEach.call((<HTMLElement>content).querySelectorAll('#frm_AD_GISA_PHOTO_LINE, #AD_GISA_PHOTO_LINE'), (v:any) => {
                v.parentNode.removeChild(v);
            });
            return clearStyles(content).innerHTML;
        })(),
        timestamp: (() => {
            const parsedData = document.getElementById('copyright')!.textContent!;
            const createdMatch = parsedData.match(/입력시간 : (\d+\/\d+\/\d+\s+\d+:\d+:\d+)/);
            const lastModifiedMatch = parsedData.match(/수정시간 : (\d+\/\d+\/\d+\s+\d+:\d+:\d+)/);
            let created;
            let lastModified;
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
        })(),
        reporters: (() => {
            //???
            const parsedData = document.querySelector('#GS_TitleGroup > .report')!;
            const name = [].slice.call(parsedData.childNodes).filter((v) => {
                return v.nodeType === 3;
            }).map((v) => {
                return v.textContent;
            }).join().trim();
            const mail = parsedData.querySelector('a')!.getAttribute('href')!.replace('mailto:', '');
            return [{
                name: name,
                mail: mail
            }];
        })()
    };
}
