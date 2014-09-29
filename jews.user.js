// ==UserScript==
// @name jews
// @namespace http://0xABCDEF.com/jews
// @description just news
// @version 0.4.0
// @updateURL https://raw.githubusercontent.com/disjukr/jews/release/jews.user.js
// @downloadURL https://raw.githubusercontent.com/disjukr/jews/release/jews.user.js
// @include http://news.kbs.co.kr/news/NewsView.do*
// @include http://world.kbs.co.kr/*/news/news_*_detail.htm*
// @include http://imnews.imbc.com/*
// @include http://mbn.mk.co.kr/pages/news/newsView.php*
// @include http://www.mbn.co.kr/pages/news/newsView.php*
// @include http://osen.mt.co.kr/article/*
// @include http://news.sbs.co.kr/news/endPage.do*
// @include http://news.khan.co.kr/kh_news/khan_art_view.html*
// @include http://dailysecu.com/news_view.php*
// @include http://news.mt.co.kr/mtview.php*
// @include http://www.mediatoday.co.kr/news/articleView.html*
// @include http://www.bloter.net/archives/*
// @include http://kr.wsj.com/posts/*
// @include http://www.etnews.com/*
// @include http://biz.chosun.com/site/data/html_dir/*
// @include http://www.zdnet.co.kr/news/news_view.asp*
// @include http://www.koreaherald.com/view.php*
// @include http://www.fnnews.com/news/*
// @include http://www.pressian.com/news/article.html*
// @include http://www.hani.co.kr/arti/*
// @include http://www.hankyung.com/news/app/newsview.php*
// @include http://ent.hankyung.com/news/app/newsview.php*
// @include http://golf.hankyung.com/news/app/newsview.php*
// @include http://land.hankyung.com/news/app/newsview.php*
// @include http://stock.hankyung.com/news/app/newsview.php*
// @include http://www.wowtv.co.kr/newscenter/news/view.asp*
// @include http://www.hankookilbo.com/v/*
// @include http://biz.heraldcorp.com/view.php?*
// @copyright 2014 JongChan Choi
// @grant none
// ==/UserScript==

var jews = {
    title: undefined,
    content: undefined,
    timestamp: undefined,
    reporters: undefined,
    pesticide: undefined,
    spraying_cycle: undefined
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
    case 'dailysecu.com': return '데일리시큐';
    case 'news.mt.co.kr': return '머니투데이';
    case 'www.mediatoday.co.kr': return '미디어오늘';
    case 'www.bloter.net': return '블로터닷넷';
    case 'kr.wsj.com': return '월스트리트저널';
    case 'www.etnews.com': return '전자신문';
    case 'biz.chosun.com': return '조선비즈';
    case 'www.zdnet.co.kr': return '지디넷코리아';
    case 'www.koreaherald.com': return '코리아헤럴드';
    case 'www.fnnews.com': return '파이낸셜뉴스';
    case 'www.pressian.com': return '프레시안';
    case 'www.hani.co.kr': return '한겨레';
    case 'www.hankyung.com': case 'ent.hankyung.com': case 'golf.hankyung.com': case 'land.hankyung.com': case 'stock.hankyung.com': return '한국경제';
    case 'www.wowtv.co.kr': return '한국경제TV';
    case 'www.hankookilbo.com': return '한국일보';
    case 'biz.heraldcorp.com': return '헤럴드경제';
    default: throw new Error('jews don\'t support this site');
    }
})();
function parse(jews) {
    if (typeof parse[where] === 'function') parse[where](jews);
}
parse['KBS'] = function (jews) {
    jews.title = $('#GoContent .news_title .tit').text();
    jews.subtitle = undefined;
    jews.content = clearStyles($('#content')[0].cloneNode(true)).innerHTML;
    jews.timestamp = (function () {
        var parsedData = $('#GoContent .news_title .time li').contents();
        function parseTime(time) {
            time = time.split('(');
            var date = new Date(time[0].replace(/\./g, '/'));
            time = time[1].split(':');
            date.setHours(parseInt(time[0], 10));
            date.setMinutes(parseInt(time[1], 10));
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
    jews.subtitle = undefined;
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
    jews.subtitle = undefined;
    jews.content = clearStyles($('#DivPrint .view-con')[0].cloneNode(true)).innerHTML;
    jews.timestamp = {
        created: new Date($('#DivPrint .article-time-date').text().replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [{
        name: $('#DivPrint .reporter').text().trim().split(/\s+/)[0],
        mail: undefined
    }];
};
parse['MBN'] = function (jews) {
    jews.title = $('#article_title .title_n').contents().eq(0).text().trim();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#newsViewArea')[0].cloneNode(true);
        $('*[id*=google]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#article_title .reg_dt').text().replace(/-/g, '/')),
        lastModified: new Date($('#article_title .upd_dt').text().replace(/-/g, '/'))
    };
    jews.reporters = [];
};
parse['OSEN'] = function (jews) {
    jews.title = $('#container .detailTitle .obj').text().trim();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#_article')[0].cloneNode(true);
        $('iframe, #divBox, #scrollDiv, div[class^=tabArea], .mask_div, .articleList', content).remove();
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor)[0].innerHTML);
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date(/\d{4}.\d\d.\d\d\s+\d\d:\d\d/.exec($('#container .writer').text())[0].replace(/\./g, '/')),
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
    jews.subtitle = $('#container .smdend_content_w .sep_cont_w .sed_article_w .sed_sub_title').text();
    jews.content = (function () {
        var content = $('#container .smdend_content_w .sep_cont_w .sed_article_w .sed_article')[0].cloneNode(true);
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('#container .smdend_content_w .sep_cont_w .sed_atcinfo_sec_w .sed_write_time').contents();
        return {
          created: new Date(parsedData.eq(0).text().replace(/\./g, '/')),
          lastModified: new Date(parsedData.eq(2).text().replace(/\./g, '/'))
        };
    })();
    jews.reporters = (function () {
        var parsedData = $('#container .smdend_content_w .sep_cont_w .sed_atcinfo_sec_w .seda_author').children();
        return [{
            name: parsedData.eq(0).text(),
            mail: /(?:mailto:)?(.*)/.exec(parsedData.eq(1).attr('href'))[1]
        }];
    })();
};
parse['경향신문'] = function (jews) {
    jews.title = $('#container .title_group .CR dt').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#sub_cntTopTxt')[0].cloneNode(true);
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor)[0].innerHTML);
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
parse['데일리시큐'] = function (jews) {
    jews.title = document.querySelector('.new_title').textContent.trim();
    jews.subtitle = document.querySelector('.news_mtitle').textContent.trim();
    jews.content = clearStyles(document.querySelector('.news_text')).innerHTML;

    var infos = document.querySelector('.new_write').textContent.split(',');

    jews.timestamp = {
        created: new Date(infos[0].replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [{
        name: /데일리시큐 (.*)기자/.exec(infos[1])[1],
        mail: infos[2].trim()
    }];
};
parse['머니투데이'] = function (jews) {
    jews.title = $('#article h1').text();
    jews.subtitle = $('#article h2').text();
    jews.content = (function () {
        var content = $('#textBody')[0].cloneNode(true);
        $('#now-sence', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.infobox1 .num').text().replace(": ", "").replace(/\./g, '/')), // ": 2014.06.20 06:31"형태로 들어있음
        lastModified: undefined
    };
    jews.reporters = (function () {
        var ret = [];
        $('.infobox1 a').each(function () {
            var reporter = {
                name: $(this).text().replace(/ 기자$/,''),
                mail: undefined
            };
            ret.push(reporter);
        });
        var main_reporter_name = $('.conbox strong').text();
        var main_reporter_mail = $('.conbox .mail').text();
        for (var i = 0; i < ret.length; i++) {
            if (ret[i].name == main_reporter_name) {
                ret[i].mail = main_reporter_mail;
            }
        }
        return ret;
    })();
    jews.pesticide = function () {
        $('#scrollDiv').remove();
    };
};
parse['미디어오늘'] = function (jews) {
    jews.title = $('#font_title').text().trim();
    jews.subtitle = $('#font_subtitle').text();
    jews.content = (function () {
        var content = $('#media_body')[0].cloneNode(true);
        $('.ad_lumieyes_area', content).each(function (i, el) {
            $(el).closest('tr').remove();
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var data = {};
        $('td[align="left"] table td', $('#font_email').closest('table').closest('td').closest('table')).text().split(/(입력|노출)\s*:([\d\-\.\s:]+)/).forEach(function (v, i, arr) {
            if (v === '입력')
                data.created = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
            else if (v === '노출')
                data.lastModified = new Date(arr[i + 1].trim().replace(/\s+/g, ' ').replace(/[-\.]/g, '/') + '+0900');
        });
        return data;
    })();
    jews.reporters = (function () {
        var parsedData = $('#font_email').text().split('|');
        return [{
            name: parsedData[0].trim(),
            mail: parsedData[1].trim()
        }];
    })();
    jews.pesticide = function () {
        $('#scrollDiv').remove();
    };
};
parse['블로터닷넷'] = function (jews) {
    jews.title = document.title;
    jews.subtitle = undefined;
    var author = document.getElementsByClassName('press-context-author')[0];
    jews.reporters = [{
        name: author.getElementsByTagName('cite')[0].innerText,
        mail: author.getElementsByTagName('a')[0].href.match(/bloter\.net\/archives\/author\/([^\/\?\s]+)/)[1]+'@bloter.net'
    }];
    jews.timestamp = {
        created: new Date(document.querySelector('meta[property="article:published_time"]').content),
        lastModified: new Date(document.querySelector('meta[property="article:modified_time"]').content)
    },
    jews.content = clearStyles(document.getElementsByClassName('press-context-news')[0].cloneNode(true)).innerHTML;
};
parse['월스트리트저널'] = function (jews) {
    jews.title = $('.articleHeadlineBox h1')[0].innerText;
    jews.subtitle = undefined;
    jews.content = (function () {
        function remove(e) {
            e.parentNode.removeChild(e);
        }
        var article = document.createElement('div');
        article.innerHTML = $('.articlePage')[0].innerHTML.split(/\s*<!--\s*article\s*[a-z]+\s*-->\s*/i)[1];
        Array.prototype.forEach.call(article.querySelectorAll('.socialByline, .insetCol3wide'), function (v) { v.remove(); });
        var article_p = article.getElementsByTagName('p');
        Array.prototype.forEach.call(article.getElementsByTagName('p'), function (v, i, arr) {
            if (/기사 번역 관련 문의: [A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i.exec(v.innerText))
                while (arr[i])
                    remove(arr[i]);
        });
        remove(article.querySelectorAll('img[src*="//cp.news.search.daum.net"]')[0]);
        return clearStyles(article).innerHTML;
    })();
    jews.timestamp = ({
        created: new Date($('.articleHeadlineBox .dateStamp')[0].innerText.replace(/\s*KST\s*$/, ' +0900').replace(/(\d+)\.?\s+([a-z]{3})[a-z]+\s+(\d+)\s*,\s*/i, '$1 $2 $3 ')), /* RFC 2822 */
        lastModified: undefined
    });
    jews.reporters = (function () {
        var byline = $('.socialByline .byline')[0];
        if (byline) {
            return [{
                name: byline.innerText.trim().replace(/^by\s+/i, ''),
                mail: undefined
            }];
        } else {
            return [{
                name: $('.socialByline .popTrigger').text(),
                mail: $('.socialByline .socialTools .email').text()
            }];
        }
    })();
};
parse['전자신문'] = function (jews) {
    jews.title = $('.hgroup h1').text() || undefined;
    jews.subtitle = $('.hgroup h3').text();
    jews.content = (function () {
        var content = $('.article_body')[0].cloneNode(true);
        $('#openLine, .art_reporter, .article_ad, .sns_area2, *[src^="http://adv"]', content).remove();
        $('.a_ict_word', content).each(function (i, el) {
            $(el).replaceWith($('.ict_word', el).text());
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.a_date').text().replace(/\./g, '/')),
        modefied: undefined
    };
    jews.reporters = [{
        name: $('.art_reporter strong').text(),
        mail: $('.art_reporter .mail').text()
    }];
};
parse['조선비즈'] = function (jews) {
    jews.title = $('#title_text').text();
    jews.subtitle = $('.article h3').text();
    jews.content = (function () {
        var content = $('.article')[0].cloneNode(true);
        $('.promotion', content).remove();
        $('div[class*=date_]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var timeStr = $('#date_text')[0].innerText;
        var created;
        var cTime = timeStr.match(/입력 : ([^\|]+)/);
        if (cTime !== null) {
            created = new Date(cTime[1].trim().replace(/\./g, '/'));
        }
        var lastModified;
        var mTime = timeStr.match(/수정 : (.+)/);
        if (mTime !== null) {
            lastModified = new Date(mTime[1].trim().replace(/\./g, '/'));
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
    jews.subtitle = $('#wrap_container_new .sub_tit_area h3').text();
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
            mail: mail !== null ? mail[0] : undefined
        }];
    })();
};
parse['코리아헤럴드'] = function (jews) {
    jews.title = $('.nview .title_sec').text();
    jews.subtitle = $('.nview .stitle_sec').text() || undefined;
    jews.content = clearStyles($('#articleText')[0].cloneNode(true)).innerHTML;
    jews.timestamp = (function () {
        var parsedData = $('.nview .writedata .date').contents();
        return {
            created: new Date(parsedData.eq(0).text().trim().replace('Published : ', '').replace(/-/g, '/')),
            lastModified: new Date(parsedData.eq(2).text().trim().replace('Updated : ', '').replace(/-/g, '/'))
        };
    })();
    jews.reporters = (function () {
        var matches = /By\s+([^(]+)\(([^)]+)\)/.exec($('#articleText').contents().eq(-1).text());
        if (matches !== null) {
            return [{
                name: matches[1].trim(),
                mail: matches[2]
            }];
        } else {
            return [];
        }
    })();
};
parse['파이낸셜뉴스'] = function (jews) {
    jews.title = $('.tit_news .tit_sect .txt_tit strong').text();
    jews.subtitle = $('.tit_news .tit_sect .desc')[0].innerHTML;
    jews.content = (function () {
        var content = $($('#article_body')[0].cloneNode(true));
        $('#ad_body', content).remove();
        return clearStyles(content[0]).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.sub_news_data .news_data .list_02').text().split('|');
        return {
            created: new Date(parsedData[0].replace('입력 : ', '').replace(/\./g, '/')),
            lastModified: new Date(parsedData[1].replace(' 수정 : ', '').replace(/\./g, '/'))
        };
    })();
    jews.reporters = [{
        name: $('.sub_news_data .news_data .list_01 a').eq(0).text().trim(),
        mail: $('.sub_news_data .news_data .list_01 .reporter_layer dd span a').text() || undefined
    }];
};
parse['프레시안'] = function (jews) {
    jews.title = $('.arvtitle .hbox h2').text();
    jews.subtitle = $('.arvtitle .hbox h3').text();
    jews.content = clearStyles($('#news_body_area')[0].cloneNode(true)).innerHTML;
    jews.timestamp = {
        created: $('.arvdate').contents().eq(1).text(),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var parsedData = $('.news_body_area>div[style="float:right;"]').children();
        return [{
            name: parsedData.eq(0).text(),
            mail: parsedData.eq(1).attr('href').replace('mailto:', '')
        }];
    })();
    jews.pesticide = function () {
        $('#scrollDiv').remove();
    };
};
parse['한겨레'] = function (jews) {
    jews.title = $('.article-category-title td').eq(1).text().trim();
    jews.subtitle = $('.article-contents h4')[0].innerHTML.trim();
    jews.content = (function () {
        var content = document.createElement('div');
        $('.article-contents').contents().forEach(function (el, i) {
            if (el instanceof HTMLHeadingElement) return;
            else if (el instanceof Comment) return;
            else if (el instanceof Text) {
                if (el.data.trim() === '') return;
                else {
                    var p = document.createElement('p');
                    el.data = el.data.trim();
                    p.appendChild(el.cloneNode());
                    content.appendChild(p);
                }
            }
            else if (el instanceof HTMLParagraphElement && el.innerHTML.trim() === "") return;
            else if (el instanceof HTMLDivElement && !$(el).hasClass('article-alignC')) return;
            else content.appendChild(el.cloneNode(true));
        });
        var i = content.childNodes.length, mail, name;
        while (i-- > 0) {
            var e = content.childNodes[i];
            if (e instanceof HTMLBRElement && i - 1 == content.length) e.remove();
            else if (e instanceof HTMLAnchorElement && e.href.match(/^mailto:/)) {
                mail = e.href.replace(/^mailto:/, '');
                e.remove();
            } else if (e instanceof HTMLParagraphElement) {
                var tmp = e.innerText.trim();
                if (tmp.match(/ (?:선임기자|기자|특파원)$/)) {
                    name = tmp.replace(/(?:글.사진|사진.글)\s+/, '');
                    e.remove();
                    break;
                } else if (tmp.match(/온라인뉴스팀|연합뉴스/)) {
                    name = tmp;
                    e.remove();
                    break;
                } else if (tmp = tmp.match(/^(.+ (?:선임기자|기자|특파원))\s+([A-Z0-9._%+-]+@hani\.co\.kr)$/i)) {
                    name = tmp[1].replace(/(?:글.사진|사진.글)\s+/, '');
                    mail = tmp[2];
                    e.remove();
                    break;
                }
            }
        }
        jews.reporters = [{
            name: name, mail: mail
        }];
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var data = {
            created: undefined,
            lastModified: undefined
        };
        $('.article-control-menu .date span').forEach(function (el, i) {
            var match = el.innerText.match(/(등록|수정)\s*:\s+(\d{4}\.\d{2}\.\d{2}\s+\d{1,2}:\d{1,2})/);
            if (match === null) return;
            var time = new Date(match[2].replace(/\./g, '-').replace(/\s+/, 'T') + ':00+09:00'); // ISO 8601
            if (match[1] === '등록') data.created = time;
            else if (match[1] === '수정') data.lastModified = time;
        });
        return data;
    })();
    jews.pesticide = function () {
        $('#scrollDiv').remove();
    };
};
parse['한국경제'] = function (jews) {
    jews.title = $('.news_sbj_h').text();
    jews.subtitle = $('.article_stit').text().trim();
    var content = $($('#newsView')[0].cloneNode(true));
    $('.article_stit, .article_aside_group, .ico_imgMore', content).remove();
    jews.content = clearStyles(content[0]).innerHTML;
    jews.timestamp = (function () {
        var parsedData = $('.news_info').children();
        return {
            created: new Date(parsedData.eq(0).text().replace(/-/g, '/')),
            lastModified: new Date(parsedData.eq(1).text().replace(/-/g, '/'))
        };
    })();
    jews.reporters = (function () {
        var articleContent = $(content[0].cloneNode(true));
        $('.articleImg', articleContent).remove();
        var line = />([^>]*기자\s*?(?:<a[^>]*>)?\S*?@[^\s<]*)/.exec(articleContent[0].innerHTML)[1].replace(/<a[^>]*>/, '').replace(/^글\. /, '');
        var words = line.split(' ');
        var mail = words.pop();
        return [{
            name: words.join(' '),
            mail: mail
        }];
    })();
};
parse['한국경제TV'] = function (jews) {
    jews.title = $('#viewTitle h2 strong').text();
    jews.subtitle = undefined;
    var content = $($('#viewContent_3')[0].cloneNode(true));
    $('div>iframe', content).remove();
    jews.content = clearStyles(content[0]).innerHTML;
    jews.timestamp = {
        created: new Date($('.writeDate').text().replace('입력 : ', '').replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var parsedData = $('.journalist_mail').contents();
        if (parsedData.length < 1) {
            return [];
        } else {
            return [{
                name: parsedData.eq(0).text().trim(),
                mail: parsedData.eq(1).text().trim()
            }];
        }
    })();
};
parse['한국일보'] = function (jews) {
    jews.title = $('#article-title').text();
    jews.subtitle = $('#article-subtitle').text();
    var content = $($('#article-body')[0].cloneNode(true));
    $('.article-ad-align-left', content).remove();
    jews.content = clearStyles(content[0]).innerHTML;
    jews.timestamp = {
        created: new Date($('#date-registered').text().replace('등록: ', '').replace(/\./g, '/')),
        lastModified: new Date($('#date-edited').text().replace('수정: ', '').replace(/\./g, '/'))
    };
    jews.reporters = (function () {
        var name = $('#article-info .author .author a').text();
        var mail;
        if (name !== '') {
            var parsedData = /\S+@\S+/.exec($('#article-body').contents().eq(-1).text().trim());
            if (parsedData !== null) {
                mail = parsedData[0];
            }
            return [{
                name: name,
                mail: mail
            }];
        } else {
            return [];
        }
    })();
};
parse['헤럴드경제'] = function (jews) {
    var $content = $($('#articleText')[0].cloneNode(true));
    $('.mask_div', $content).remove();
    jews.title = $('.article_text span').text();
    jews.subtitle = undefined;
    jews.content = clearStyles($content[0]).innerHTML;
    jews.timestamp = {
        created: new Date($('.new_time').text().replace('기사입력', '').replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var contentText = $content.text().trim();
        var name = /^(?:［|\[)헤럴드경제=(.+?)\s+기자(?:\]|］)/.exec(contentText);
        var mail = $content.contents().filter(function () {
            return this.nodeType === 3 && this.textContent.indexOf('@heraldcorp.com') > -1;
        });
        mail = (mail.length > 0) ? (mail[0].textContent) : undefined;
        return [{
            name: name ? name[1] : undefined,
            mail: mail || $('[href^=mailto]').text() || undefined
        }];
    })();
    jews.pesticide = function () {
        $('#scrollDiv').remove();
        $('#tbFadeIn').remove();
    };
};

function $(selector, context) {
    return new $.fn.init(selector, context);
}
$.fn = {};
$.fn.init = function (selector, context) {
    if (typeof context == 'string' || context instanceof String) {
        selector = context + ' ' + selector;
        context = undefined;
    }
    context = context || document;
    if (!(context instanceof Node)) {
        context = context[0];
    }
    this.length = 0;
    if (selector instanceof Node)
        this.push(selector);
    else if (typeof selector == 'string' || selector instanceof String)
        $.merge(this, context.querySelectorAll(selector));
    else if (selector && selector.length)
        $.merge(this, selector);
};
$.fn.init.prototype.attr = function (attributeName) {
    return this[0].getAttribute(attributeName);
};
$.fn.init.prototype.children = function () {
    return $(this[0].children);
};
$.fn.init.prototype.closest = function (selector) {
    var node = this[0];
    while (node) {
        if ($.matches(node, selector)) {
            return $(node);
        }
        node = node.parentNode;
    }
};
$.fn.init.prototype.contents = function () {
    var result = $(this[0].childNodes);
    for (var i = 1; i < this.length; ++i) {
        $.merge(result, $(this[i].childNodes));
    }
    return result;
};
$.fn.init.prototype.each = function (fn) {
    for (var i = 0; i < this.length; ++i)
        fn.call(this, i, this[i]);
};
$.fn.init.prototype.eq = function (index) {
    if (index < 0) {
        index += this.length;
    }
    return $(this[index]);
};
$.fn.init.prototype.filter = function (selector) {
    var result = $();
    var i;
    if (typeof selector == 'string' || selector instanceof String) {
        for (i = 0; i < this.length; ++i) {
            if ($.matches(this[i], selector))
                result.push(this[i]);
        }
    } else if (typeof selector == 'function') {
        for (i = 0; i < this.length; ++i) {
            if (selector.call(this[i], i, this[i]))
                result.push(this[i]);
        }
    }
    return result;
};
$.fn.init.prototype.forEach = function (fn) {
    for (var i = 0; i < this.length; i++) {
        fn.call(this, this[i], i);
    }
};
$.fn.init.prototype.hasClass = function (className) {
    var node = this[0];
    if (node.classList) {
        return node.classList.contains(className);
    } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(node.className);
    }
};
$.fn.init.prototype.push = function (item) {
    var length = this.length;
    this[length++] = item;
    this.length = length;
    return length;
};
$.fn.init.prototype.remove = function () {
    for (var i = 0; i < this.length; i++) {
        var node = this[i];
        node.parentNode.removeChild(node);
    }
};
$.fn.init.prototype.replaceWith = function (string) {
    this[0].outerHTML = string;
};
$.fn.init.prototype.text = function () {
    if (this[0]) {
        return this[0].textContent;
    } else {
        return '';
    }
};
$.fn.init.prototype.toArray = function () {
    var array = [];
    for (var i = 0; i < this.length; i++) {
        array[i] = this[i];
    }
    return array;
};
$.merge = function (first, second) {
    var length = first.length;
    for (var i = 0; i < (second.length | 0); ++i) {
        first[length] = second[i];
        first.length = ++length;
    }
    return first;
};
$.matches = function (el, selector) {
    return (el.matches || el.matchesSelector ||
            el.msMatchesSelector || el.mozMatchesSelector ||
            el.webkitMatchesSelector || el.oMatchesSelector)
        .call(el, selector);
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
            (function () {
                if (jews.subtitle && jews.subtitle !== '') {
                    return '<h2>' + jews.subtitle + '</h2>';
                } else {
                    return '';
                }
            })(),
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
    if (typeof jews.pesticide === 'function')
        window.setInterval(jews.pesticide, jews.spraying_cycle || 1000);
}, true);
