import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('#GS_Title').text();
    jews.subtitle = $('#GS_SubTitle').text() || undefined;
    jews.content = (function () {
        var content = $('#GS_Content')[0].cloneNode(true);
        $('#frm_AD_GISA_PHOTO_LINE, #AD_GISA_PHOTO_LINE', content).remove();
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor)[0].innerHTML);
        });
        var photo = $('#GS_RelPhoto')[0];
        var imgs = '';
        if (photo) {
            var photoDiv = document.createElement('div');
            photo = photo.cloneNode(true);
            if ($('.RelPhoto2', photo)[0])
                $('.RelPhoto1', photo).remove();
            $('li > *', photo).toArray().forEach(function (item) {
                photoDiv.appendChild(clearStyles(item));
            });
            return clearStyles(photoDiv).innerHTML + clearStyles(content).innerHTML;
        }
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#input_time dd').eq(0).text().replace('입력시간 :', '').trim()),
        lastModified: new Date($('#modify_gisa').eq(0).text().replace('수정시간 :', '').replace(/\./g, '/').trim())
    };
    jews.reporters = $('#GS_Reporter ul li').toArray().map(function (li) {
        li = li.cloneNode(true);
        var mail = $('a', li).text();
        $('a', li).remove();
        var name = $(li).text();
        return { name: name, mail: mail };
    });
    jews.cleanup = function () {
        $('#frm_photoLink').remove();
        $('#scrollDiv').remove();
    };
}