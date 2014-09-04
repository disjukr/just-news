// ==UserScript==
// @name jews
// @namespace http://0xABCDEF.com/jews
// @description just news
// @include http://news.kbs.co.kr/news/NewsView.do*
// @include http://world.kbs.co.kr/*/news/news_*_detail.htm*
// @copyright 2014 JongChan Choi
// @grant none
// ==/UserScript==

var jews = jews || {};
function JEWS_INIT() {
    var where = (function () {
        switch (window.location.hostname) {
        case 'news.kbs.co.kr': return 'KBS';
        case 'world.kbs.co.kr': return 'KBS World';
        default: throw new Error('jews don\'t support this site');
        }
    })();
    jews.title = (function () {
        switch (where) {
        case 'KBS': return $('#GoContent .news_title .tit').text();
        case 'KBS World': return document.getElementById('content_area').getElementsByClassName('title')[0].getElementsByTagName('h2')[0].textContent;
        default: return undefined;
        }
    })();
    jews.content = (function () {
        switch (where) {
        case 'KBS': return $(clearStyles($('#content')[0].cloneNode(true))).prop('innerHTML');
        case 'KBS World':
            return (function () {
                var photo = document.getElementById('container').getElementsByClassName('photo')[0];
                var content = document.getElementById('content').cloneNode(true);
                if (photo !== undefined)
                    content.insertBefore(photo.getElementsByTagName('img')[0], content.firstChild);
                return clearStyles(content).innerHTML;
            })();
        default: return undefined;
        }
    })();
    jews.timestamp = (function () {
        switch (where) {
        case 'KBS':
            return (function () {
                var parsedData = $('#GoContent .news_title .time li').contents();
                function parseTime(time) {
                    time = time.split('(');
                    var date = new Date(time[0]);
                    time = time[1].split(':');
                    date.setHours(parseInt(time[0]));
                    date.setMinutes(parseInt(time[1]));
                    return date;
                }
                return {
                    created: parseTime(parsedData.eq(1).text()),
                    lastModified: parseTime(parsedData.eq(3).text())
                };
            })();
        case 'KBS World':
            return (function () {
                var parsedData = document.getElementById('content_area').getElementsByClassName('title')[0].getElementsByTagName('em');
                return {
                    created: new Date(parsedData[0].textContent),
                    lastModified: new Date(parsedData[1].textContent)
                };
            })();
        default:
            return {
                created: undefined,
                lastModified: undefined
            };
        }
    })();
    jews.reporters = (function () {
        switch (where) {
        case 'KBS':
            return (function () {
                return $('#ulReporterList .reporterArea').toArray().map(function (reporterArea) {
                    var mail = $('.reporter_mail img[alt=이메일]', reporterArea).closest('a').attr('href');
                    if (mail !== undefined)
                        mail = /'.*','(.*)'/.exec(mail)[1];
                    return {
                        name: $('.reporter_name', reporterArea).contents().eq(0).text().trim(),
                        mail: mail
                    };
                });
            })();
        case 'KBS World': return [];
        default: return [];
        }
    })();
    function clearStyles(element) {
        Array.prototype.forEach.call(element.querySelectorAll('*[style]'), function (child) {
            child.removeAttribute('style');
        });
        Array.prototype.forEach.call(element.querySelectorAll('img'), function (image) {
            image.removeAttribute('width');
            image.removeAttribute('height');
            image.removeAttribute('border');
        });
        return element;
    }
};
window.addEventListener('load', function (e) {
    JEWS_INIT();
    (function () {
        var id = window.setTimeout('0', 0);
        while (id--) window.clearTimeout(id);
    })();
    document.write([
        '<!DOCTYPE html><html>',
        '<head>',
            '<title>', jews.title || 'jews', '</title>',
            '<style>',
            '@import url(http://fonts.googleapis.com/earlyaccess/nanummyeongjo.css);',
            'body {',
                'margin-top: 50px;',
                'margin-bottom: 500px;',
                'text-align: center;',
            '}',
            '#meta {',
                'display: inline-block;',
                'width: 640px;',
            '}',
            '#timestamp {',
                'color: #888;',
                'font-size: 10pt;',
                'text-align: left;',
            '}',
            '#timestamp p {',
                'margin: 0;',
            '}',
            '#reporters {',
                'list-style-type: none;',
                'text-align: right;',
            '}',
            '#reporters .mail {',
                'margin-left: 8px;',
            '}',
            '#content {',
                'display: inline-block;',
                'width: 640px;',
                'font-family: \'Nanum Myeongjo\', serif;',
                'font-size: 11pt;',
                'text-align: justify;',
            '}',
            '#content img {',
                'margin: 15px 0;',
                'width: 100%;',
                'height: auto;',
            '}',
            '</style>',
            '<meta charset="utf-8">',
        '</head>',
        '<body>',
            '<h1>', jews.title || 'no title', '</h1>',
            '<div id="meta">',
                '<div id="timestamp">',
                (function () {
                    var result = '';
                    var created = jews.timestamp.created;
                    var lastModified = jews.timestamp.lastModified;
                    if (created !== undefined) {
                        created = created.toLocaleString !== undefined ?
                                  created.toLocaleString() :
                                  created.toDateString();
                        result += '<p>작성일: <span class="created">' + created + '</span></p>';
                    }
                    if (lastModified !== undefined) {
                        lastModified = lastModified.toLocaleString !== undefined ?
                                       lastModified.toLocaleString() :
                                       lastModified.toDateString();
                        result += '<p>마지막 수정일: <span class="last-modified">' + lastModified + '</span></p>';
                    }
                    return result;
                })(),
                '</div>',
                '<ul id="reporters">',
                jews.reporters.map(function (reporter) {
                    var result = ['<li>'];
                    if (reporter.name !== undefined)
                        result.push('<span class="name">' + reporter.name + '</span>');
                    if (reporter.mail !== undefined)
                        result.push('<span class="mail">' + reporter.mail + '</span>');
                    result.push('</li>');
                    return result.join('');
                }).join(''),
                '</ul>',
            '</div><br>',
            '<div id="content">', jews.content || 'empty', '</div>',
        '</body></html>'
    ].join(''));
}, true);
