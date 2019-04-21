import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    $('#frm_photoLink').remove();
    $('#scrollDiv').remove();
}

export function parse(): Article {
    return {
        title: $('#GS_Title').text(),
        subtitle: $('#GS_SubTitle').text() || undefined,
        content: (() => {
            const content = $('#GS_Content')[0].cloneNode(true);
            $('#frm_AD_GISA_PHOTO_LINE, #AD_GISA_PHOTO_LINE', content).remove();
            $('a', content).each(function (_, anchor) {
                $(anchor).replaceWith($(anchor)[0].innerHTML);
            });
            let photo: any = $('#GS_RelPhoto')[0];
            if (photo) {
                const photoDiv = document.createElement('div');
                photo = photo.cloneNode(true);
                if ($('.RelPhoto2', photo)[0])
                    $('.RelPhoto1', photo).remove();
                $('li > *', photo).toArray().forEach(function (item) {
                    photoDiv.appendChild(clearStyles(item));
                });
                return clearStyles(photoDiv).innerHTML + clearStyles(content).innerHTML;
            }
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: new Date($('#input_time dd').eq(0).text().replace('입력시간 :', '').trim()),
            lastModified: new Date($('#modify_gisa').eq(0).text().replace('수정시간 :', '').replace(/\./g, '/').trim())
        },
        reporters: $('#GS_Reporter ul li').toArray().map((li:any) => {
            li = li.cloneNode(true);
            const mail = $('a', li).text();
            $('a', li).remove();
            const name = $(li).text();
            return { name: name, mail: mail };
        }),
    };
}
