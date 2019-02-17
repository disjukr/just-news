import * as $ from 'jquery';
import { clearStyles } from '../util';

export const cleanup = () => {
    const $share = $('a[href*="mailto"]');
    if ($share.length) {
        $($share[0].parentNode!).remove();
    }
    $('.pinitshareimage').remove();
    $('.ad_wrapper').remove();
    $('.hp-slideshow-wrapper').remove();
};

export default function () {
    const mainImageContent = (() => {
        const $mainImage = $('.main-visual img[data-img-path]');
        if ($mainImage.length) {
            return '<img alt="' + $mainImage.attr('alt') + '" src="' + $mainImage.attr('data-img-path') + '" /><br />';
        } else {
            return '';
        }
    })();
    const mainVideoContent = (() => {
        const $mainVideo = $('.main-visual iframe');
        if ($mainVideo.length) {
            return $mainVideo[0].outerHTML + '<br />';
        } else {
            return '';
        }
    })();
    return {
        title: $('h1.title').text(),
        subtitle: undefined,
        content: (() => {
            const content = $($('#mainentrycontent')[0].cloneNode(true));
            $('.float_left', content).remove();
            return mainImageContent + mainVideoContent + clearStyles(content[0]).innerHTML;
        })(),
        timestamp: {
            created: new Date($('.posted time[datetime]').attr('datetime')!),
            lastModified: new Date($('.updated time[datetime]').attr('datetime')!)
        },
        reporters: (() => {
            const namefn = document.querySelector('.name.fn');
            if (namefn) {
                const splitted = namefn.textContent!.split('작성자');
                let parsedName;
                if (splitted.length === 1) {
                    parsedName = splitted[0];
                } else {
                    parsedName = splitted[1];
                }
                return [{
                    name: parsedName.trim().split(/\s+/).join(' '),
                    mail: undefined
                }];
            } else {
                return [];
            }
        })()
    };
}
