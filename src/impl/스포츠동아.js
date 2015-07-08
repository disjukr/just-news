import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = document.querySelector('.sub_contents>.article_cont .article_tit>h3').textContent;
    jews.subtitle = undefined;
    jews.timestamp = {
        created: new Date(document.querySelector('.sub_contents>.article_cont .article_tit>p').textContent.replace('입력', '').trim().replace(/\s+/,'T')+'+09:00'),  // ISO 8601
        lastModified: undefined
    };
    jews.content = clearStyles(document.querySelector('#ct>div.article_word')).innerHTML;
    jews.reporters = [];
    jews.cleanup = function () {
        [].forEach.call(document.getElementById('content').querySelectorAll('div:not([class^="article"]):not(.slideshow), script, iframe'), function (v) {
            v.parentNode.removeChild(v);
        });
    };
    var slides = document.querySelector('iframe[id^="iPhotoSlide_"]');
    if (slides) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var toparse = document.createElement('div');
                toparse.innerHTML = this.responseText;
                var img = toparse.querySelector('.iPhotoSlide>.iPhotoSlideList>ul').querySelectorAll('li a.p img');
                var slides = document.createElement('div');
                slides.className = 'slideshow';
                slides.style.width = '100%';
                slides.style.whiteSpace = 'nowrap';
                slides.style.overflowX = 'auto';
                [].forEach.call(img, function (v) {
                    var figure = document.createElement('figure');
                    var img = document.createElement('img');
                    img.src = v.src;
                    figure.appendChild(img);
                    figure.style.display = 'inline-block';
                    figure.style.width = '100%';
                    figure.style.margin = '0';
                    slides.appendChild(figure);
                });
                window.setTimeout((function (slides) {
                    return function q() {
                        var jewsContent = document.getElementById('content');
                        jewsContent.insertBefore(slides, jewsContent.firstChild);
                    };
                })(slides), 500);
            }
        };
        xhr.open("GET", slides.src, true);
        xhr.send();
    }
    return jews;
}
