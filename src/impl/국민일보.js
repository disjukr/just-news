import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('.NwsCon .nwsti h2').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = clearStyles($('#articleBody')[0].cloneNode(true));
        var fbPost = $('#articleBody .fb-post');
        if (fbPost.length > 0) {
            $('.fb-post', content).replaceWith(fbPost[0].outerHTML);
        }
        var slides = document.createElement('div');
        slides.className = 'slideshow';
        slides.style.width = '100%';
        slides.style.whiteSpace = 'nowrap';
        slides.style.overflowX = 'auto';
        var style = document.createElement('style');
        style.textContent = '.slideshow figure{display: inline-block} .slideshow figure>figcaption{white-space: normal}';
        slides.appendChild(style);
        [].forEach.call(document.querySelectorAll('#gisaimage>.pic #picLst'), function (v) {
            var fig = document.createElement('figure'),
                el = document.createElement('img'),
                img = v.getElementsByTagName('img')[0];
            if (!img) {
                return;
            }
            el.src = img.src;
            fig.appendChild(el);
            el = document.createElement('figcaption');
            var captn = v.getElementsByClassName('captn')[0];
            if (captn) {
                el.textContent = captn.textContent;
            } else {
                el.textContent = img.alt;
            }
            fig.appendChild(el);
            slides.appendChild(fig);
        });
        content.insertBefore(slides, content.firstChild);
        return content.innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.NwsCon .nwsti .date .t11');
        return {
            created: new Date(parsedData.eq(0).text().replace(/-/g, '/')),
            lastModified: parsedData.length > 1 ? new Date(parsedData.eq(1).text().replace(/-/g, '/')) : undefined
        };
    })();
    jews.reporters = (function () {
        var name = $('.NwsCon .nwsti .nm').text().trim();
        var match = $('#articleBody').text().match(new RegExp(name + '\\s+([^\\s]+@[^\\s]+)'));
        return [{
            name: name,
            mail: (match !== null) ? match[1] : undefined
        }];
    })();
    jews.cleanup = function () {
        $('#scrollDiv').remove();
    };
}