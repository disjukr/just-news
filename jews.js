// ==UserScript==
// @name jews
// @namespace http://0xABCDEF.com/jews
// @description just news
// @include http://news.kbs.co.kr/news/NewsView.do*
// @include http://world.kbs.co.kr/*/news/news_*_detail.htm*
// @include http://imnews.imbc.com/*
// @include http://mbn.mk.co.kr/pages/news/newsView.php*
// @include http://www.mbn.co.kr/pages/news/newsView.php*
// @include http://osen.mt.co.kr/article/*
// @include http://news.sbs.co.kr/news/endPage.do*
// @include http://news.khan.co.kr/kh_news/khan_art_view.html*
// @include http://www.mediatoday.co.kr/news/articleView.html*
// @include http://kr.wsj.com/posts/*
// @include http://biz.chosun.com/site/data/html_dir/*
// @include http://www.zdnet.co.kr/news/news_view.asp*
// @copyright 2014 JongChan Choi
// @grant none
// ==/UserScript==

var jews = {
    title: undefined,
    content: undefined,
    timestamp: undefined,
    reporters: undefined
};
var where = (function () {
    switch (window.location.hostname) {
    case 'news.kbs.co.kr': return 'KBS';
    case 'world.kbs.co.kr': return 'KBS World';
    case 'imnews.imbc.com': return 'MBC';
    case 'mbn.mk.co.kr': case 'www.mbn.co.kr': return 'MBN';
    case 'osen.mt.co.kr': return 'OSEN';
    case 'news.sbs.co.kr': return 'SBS';
    case 'news.khan.co.kr': return '경향신문';
    case 'www.mediatoday.co.kr': return '미디어오늘';
    case 'kr.wsj.com': return '월스트리트저널';
    case 'biz.chosun.com': return '조선비즈';
    case 'www.zdnet.co.kr': return '지디넷코리아';
    default: throw new Error('jews don\'t support this site');
    }
})();
function parse(jews) {
    parse[where] && parse[where](jews);
}
parse['KBS'] = function (jews) {
    jews.title = $('#GoContent .news_title .tit').text();
    jews.content = clearStyles($('#content')[0].cloneNode(true)).innerHTML;
    jews.timestamp = (function () {
        var parsedData = $('#GoContent .news_title .time li').contents();
        function parseTime(time) {
            time = time.split('(');
            var date = new Date(time[0].replace(/\./, '/'));
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
    jews.reporters = (function () {
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
};
parse['KBS World'] = function (jews) {
    jews.title = document.getElementById('content_area').getElementsByClassName('title')[0].getElementsByTagName('h2')[0].textContent;
    jews.content = (function () {
        var photo = document.getElementById('container').getElementsByClassName('photo')[0];
        var content = document.getElementById('content').cloneNode(true);
        if (photo !== undefined)
            content.insertBefore(photo.getElementsByTagName('img')[0], content.firstChild);
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = document.getElementById('content_area').getElementsByClassName('title')[0].getElementsByTagName('em');
        return {
            created: new Date(parsedData[0].textContent.replace(/-/g, '/')),
            lastModified: new Date(parsedData[1].textContent.replace(/-/g, '/'))
        };
    })();
    jews.reporters = [];
};
parse['MBC'] = function (jews) {
    jews.title = $('#content .view-title').text();
    jews.content = clearStyles($('#DivPrint .view-con')[0].cloneNode(true)).innerHTML;
    jews.timestamp = {
        created: new Date($('#DivPrint .article-time-date').text()),
        lastModified: undefined
    };
    jews.reporters = [{
        name: $('#DivPrint .reporter').text().trim().split(/\s+/)[0],
        mail: undefined
    }];
};
parse['MBN'] = function (jews) {
    jews.title = $('#article_title .title_n').contents().eq(0).text().trim();
    jews.content = (function () {
        var content = $('#newsViewArea')[0].cloneNode(true);
        $('*[id*=google]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#article_title .reg_dt').text().replace('기사입력', '')),
        lastModified: undefined
    };
    jews.reporters = [];
};
parse['OSEN'] = function (jews) {
    jews.title = $('#container .detailTitle .obj').text().trim();
    jews.content = (function () {
        var content = $('#_article')[0].cloneNode(true);
        $('iframe, #divBox, #scrollDiv, div[class^=tabArea], .mask_div, .articleList', content).remove();
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor).contents());
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date(/\d{4}.\d\d.\d\d\s+\d\d:\d\d/.exec($('#container .writer').text())),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var mail = $('#container .detailLink a[href^=mailto]');
        if (mail.length > 0)
            mail = mail.attr('href').substr('mailto:'.length);
        return [{
            name: $('#container .writer').text().split(/\s+/)[1],
            mail: mail || undefined
        }];
    })();
};
parse['SBS'] = function (jews) {
    jews.title = $('#container .smdend_content_w .sep_cont_w .sed_articel_head .seda_title').text();
    jews.content = (function() {
        var content = $('#container .smdend_content_w .sep_cont_w .sed_article_w .sed_article')[0].cloneNode(true);
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function() {
        var parsedData = $('#container .smdend_content_w .sep_cont_w .sed_atcinfo_sec_w .sed_write_time').contents();
        return {
          created: new Date(parsedData.eq(0).text().replace(/\./g, '/')),
          lastModified: new Date(parsedData.eq(2).text().replace(/\./g, '/'))
        }
    })();
    jews.reporters = (function() {
        var parsedData = $('#container .smdend_content_w .sep_cont_w .sed_atcinfo_sec_w .seda_author').children();
        return [{
            name: parsedData.eq(0).text(),
            mail: /(?:mailto:)?(.*)/.exec(parsedData.eq(1).attr('href'))[1]
        }];
    })();
};
parse['경향신문'] = function (jews) {
    jews.title = $('#container .title_group .CR dt').text();
    jews.content = (function () {
        var content = $('#sub_cntTopTxt')[0].cloneNode(true);
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor).contents());
        });
        $('#article_bottom_ad, #divBox', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('#container .article_date').contents();
        return {
            created: new Date(parsedData.eq(0).text().replace(/-/g, '/')),
            lastModified: new Date(parsedData.eq(2).text().replace(/-/g, '/'))
        };
    })();
    jews.reporters = (function () {
        var parsedData = $('#container .title_group .CR dd').text().trim().split(/\s+/);
        return [{
            name: parsedData[0],
            mail: parsedData[2] || undefined
        }];
    })();
};
parse['미디어오늘'] = function (jews) {
    jews.title = $('#font_title').text().trim();
    jews.content = clearStyles($('#media_body')[0].cloneNode(true)).innerHTML;
    jews.timestamp = (function () {
        var data = {};
        $('#font_email').closest('td[class!="SmN"]').closest('table').find('td[align="left"] table td').text().split(/(입력|노출)\s*:([\d\-\.\s:]+)/).forEach(function (v, i, arr) {
            if (v === '입력')
                data.created = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
            else if (v === '노출')
                data.lastModified = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
        });
        return data;
    })();
    jews.reporters = (function () {
        var parsedData = $('#font_email').text().split('|')
        return [{
            name: parsedData[0].trim(),
            mail: parsedData[1].trim()
        }];
    })();
};
parse['월스트리트저널'] = function (jews) {
    jews.title = $$('.articleHeadlineBox h1')[0].innerText;
    jews.content = (function () {
        function remove (e) {
            e.parentNode.removeChild(e);
        }
        var article = document.createElement('div');
        article.innerHTML = $$('.articlePage')[0].innerHTML.split(/\s*<!--\s*article\s*[a-z]+\s*-->\s*/i)[1];
        Array.prototype.forEach.call(article.querySelectorAll('.socialByline, .insetCol3wide'), function (v) {v.remove()});
        var article_p = article.getElementsByTagName('p');
        Array.prototype.forEach.call(article.getElementsByTagName('p'), function (v, i, arr) {
            if (/기사 번역 관련 문의: [A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i.exec(v.innerText))
                while(arr[i] != null)
                    remove(arr[i]);
        })
        remove(article.querySelectorAll('img[src*="//cp.news.search.daum.net"]')[0]);
        return clearStyles(article).innerHTML;
    })();
    jews.timestamp = ({
        created: new Date($$('.articleHeadlineBox .dateStamp')[0].innerText.replace(/\s*KST\s*$/, ' +0900').replace(/(\d+)\.?\s+([a-z]{3})[a-z]+\s+(\d+)\s*,\s*/i, '$1 $2 $3 ')), /* RFC 2822 */
        lastModified: undefined
    });
    jews.reporters = [{
        name: $$('.socialByline .byline')[0].innerText.trim().replace(/^by\s+/i, ''),
        mail: undefined
    }];
};
parse['조선비즈'] = function (jews) {
    jews.title = $('#title_text').text();
    jews.content = (function () {
        var content = $('.article')[0].cloneNode(true);
        $('.promotion', content).remove();
        $('div[class*=date_]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var timeStr = $('#date_text')[0].innerText;
        var created = undefined;
        var cTime = timeStr.match(/입력 : ([^\|]+)/);
        if (cTime !== null) {
            created = new Date(cTime[1].trim());
        };
        var lastModified = undefined;
        var mTime = timeStr.match(/수정 : (.+)/);
        if (mTime !== null) {
            lastModified = new Date(mTime[1].trim());
        }
        return {
            created: created,
            lastModified: lastModified
        };
    })();
    jews.reporters = [{
        name: $('#j1').text().trim().split(' ')[0],
        mail: $('.j_con_li a').text() || undefined
    }];
};
parse['지디넷코리아'] = function (jews) {
    jews.title = $('#wrap_container_new .sub_tit_area h2').text();
    jews.content = clearStyles($('#content')[0].cloneNode(true)).innerHTML;
    jews.timestamp = (function () {
        var time = $('#wrap_container_new .sub_tit_area .sub_data').text().split('/');
        var date = new Date(time[0].replace(/\./g, '/'));
        time = /([AP]M)\s*(\d\d):(\d\d)/i.exec(time[1]);
        var hh = time[2] | 0;
        var mm = time[3] | 0;
        if (time[1].toUpperCase() === 'PM') hh += 12;
        date.setHours(hh);
        date.setMinutes(mm);
        return {
            created: date,
            lastModified: undefined
        };
    })();
    jews.reporters = (function () {
        var reporterInfoString = $('#wrap_container_new .sub_tit_area').children().eq(2).text().trim();
        var mail = /[.a-zA-Z0-9]+@[.a-zA-Z0-9]+/.exec(reporterInfoString);
        return [{
            name: reporterInfoString.split(/\s+/)[0],
            mail: mail != null ? mail[0] : undefined
        }];
    })();
};

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

window.addEventListener('load', function (e) {
    parse(jews);
    (function () {
        var id = window.setTimeout('0', 0);
        while (id--) window.clearTimeout(id);
    })();
    document.body.parentElement.innerHTML = [
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
                jews.reporters && jews.reporters.map(function (reporter) {
                    var result = ['<li>'];
                    if (reporter.name !== undefined)
                        result.push('<span class="name">' + reporter.name + '</span>');
                    if (reporter.mail !== undefined)
                        result.push('<span class="mail">' + reporter.mail + '</span>');
                    result.push('</li>');
                    return result.join('');
                }).join('') || '',
                '</ul>',
            '</div><br>',
            '<div id="content">', jews.content || 'empty', '</div>',
        '</body>'
    ].join('');
}, true);
