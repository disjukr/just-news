import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    var mainImageContent = (function () {
        var $mainImage = $('.main-visual img[data-img-path]');
        if ($mainImage.length) {
            return '<img alt="' + $mainImage.attr('alt') + '" src="' + $mainImage.attr('data-img-path') + '" /><br />';
        } else {
            return '';
        }
    })();
    var mainVideoContent = (function () {
        var $mainVideo = $('.main-visual iframe');
        if ($mainVideo.length) {
            return $mainVideo[0].outerHTML + '<br />';
        } else {
            return '';
        }
    })();
    jews.title = $('h1.title').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $($('#mainentrycontent')[0].cloneNode(true));
        $('.float_left', content).remove();
        return mainImageContent + mainVideoContent + clearStyles(content[0]).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.posted time[datetime]').attr('datetime')),
        lastModified: new Date($('.updated time[datetime]').attr('datetime'))
    };
    jews.reporters = (function () {
        var namefn = document.querySelector('.name.fn');
        if (namefn) {
            var splitted = namefn.textContent.split('작성자');
            var parsedName;
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
    })();
    jews.cleanup = function () {
        var $share = $('a[href*="mailto"]');
        if ($share.length) {
            $($share[0].parentNode).remove();
        }
        $('.pinitshareimage').remove();
        $('.ad_wrapper').remove();
        $('.hp-slideshow-wrapper').remove();
    };
    return jews;
}
