import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export const cleanup = () => {
    $('#trackbar, iframe').remove();
}

export function parse(): Promise<Article> {
    return new Promise(resolve => {
        let jews: Article = {};
        jews.title = $('#content > .main-content > .sectionContent h1').text();
        jews.subtitle = undefined;
        jews.content = (() => {
            let header = '';
            const articleImage = $('#articleImage')[0];
            if (articleImage) {
                header += clearStyles(articleImage.cloneNode(true)).innerHTML;
            }
            return header + clearStyles($('#articleText')[0].cloneNode(true)).innerHTML;
        })();
        jews.timestamp = {
            created: new Date($('.article-header .timestamp').text().trim().replace(/\s+/g, " ")
                              .replace(/^([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+),/, "$1, $3 $2")
                              .replace(/(\d+)(:\d+)([ap]m)/, function(_, a, b, c){
                                  a |= 0;
                                  if(c === "pm") a +=12;
                                  if(a % 12 === 0) a -= 12;
                                  return a + b + ":00";
                              })),
                              lastModified: undefined
        };
        jews.reporters = (() => {
            let result = [];
            let rawReporters: any = $('#articleInfo .byline').text().replace(/By /, '');
            if (rawReporters !== "") {
                // Reporters exist.
                rawReporters = rawReporters.split(' and ');
                if (rawReporters.length > 1) {
                    // There are more than one reporter.
                    rawReporters[0].split(',').forEach((v: any) => {
                        result.push({
                            name: v.trim(),
                            mail: undefined
                        });
                    });
                    result.push({
                        name: rawReporters[1].trim(),
                        mail: undefined
                    });
                } else {
                    // There is only one reporter.
                    result.push({
                        name: rawReporters[0].trim(),
                        mail: undefined
                    });
                }
            }
            return result;
        })();
        if ($('#slideshowInlineLarge+script')[0]) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', $('#slideshowInlineLarge+script')[0].textContent!.split(/'sJSON'|"sJSON"/g).pop()!.match(/\/assets\/[^']+/)![0], true);
            xhr.onreadystatechange = function () {
                if (this.readyState === (this.DONE || 4)) {
                    const r = this.responseText;
                    let imgJSON: any = new Function(
                        'return ' + r.substring(r.indexOf('{'), r.lastIndexOf('}') + 1)
                    )();
                    imgJSON = imgJSON && imgJSON.slideshow && imgJSON.slideshow.slides; // Bro, do you even javascript?
                    if (!imgJSON) return;
                    const slides = document.createElement('div');
                    slides.className = 'slideshow';
                    slides.style.width = '100%';
                    slides.style.whiteSpace = 'nowrap';
                    slides.style.overflowX = 'auto';
                    const style = document.createElement('style');
                    style.textContent = '.slideshow figure{display: inline-block} .slideshow figure>figcaption{white-space: normal}';
                    slides.appendChild(style);
                    //?
                    imgJSON.forEach((v: any) => {
                        /*
                         * <figure>
                         *     <img src="/sample.jpg">
                         *     <figcaption>caption message</figcaption>
                         * </figure>
                         */
                        let fig = document.createElement('figure'),
                            el: any = document.createElement('img'),
                            caption = document.createTextNode(v.caption);
                        el.src = v.image;
                        fig.appendChild(el);
                        el = document.createElement('figcaption');
                        el.appendChild(caption);
                        fig.appendChild(el);
                        slides.appendChild(fig);
                    });
                    jews.content = slides.outerHTML + jews.content;
                    resolve(jews);
                }
            };
            xhr.send();
            return;
        }
        resolve(jews);
    });
}
