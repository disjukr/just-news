import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = document.querySelector('#articleTitle').innerText;
    var content = document.querySelector('#articleBodyContents');
    var iframes = content.querySelectorAll('.vod_area iframe[_src]');
    if (iframes.length > 0) {
        iframes.forEach(function (v) {
            v.setAttribute('src', v.getAttribute('_src'));
        });
    }
    jews.content = clearStyles(content).innerHTML;

    var created = document.querySelector('.article_info .sponsor .t11').innerText;
    created = new Date(created.replace(' ', 'T') + '+09:00'); // ISO 8601
    jews.timestamp = {
        created: created,
        lastModified: undefined
    };
    jews.cleanup = function () {
        document.querySelectorAll('#tooltipLayer_english, .u_cbox_layer_wrap').forEach(function (v) {
            v.remove();
        });
    };
    return jews;
}
