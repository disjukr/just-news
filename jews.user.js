// ==UserScript==
// @name jews
// @namespace http://0xABCDEF.com/jews
// @description just news
// @version 0.6.0
// @updateURL https://raw.githubusercontent.com/disjukr/jews/release/jews.user.js
// @downloadURL https://raw.githubusercontent.com/disjukr/jews/release/jews.user.js
// @include http://news.jtbc.joins.com/html/*
// @include http://news.kbs.co.kr/news/NewsView.do*
// @include http://world.kbs.co.kr/*/news/news_*_detail.htm*
// @include http://imnews.imbc.com/*
// @include http://mbn.mk.co.kr/pages/news/newsView.php*
// @include http://www.mbn.co.kr/pages/news/newsView.php*
// @include http://osen.mt.co.kr/article/*
// @include http://news.sbs.co.kr/news/endPage.do*
// @include http://www.ytn.co.kr/_ln/*
// @include http://news.khan.co.kr/kh_news/khan_art_view.html*
// @include http://news.kmib.co.kr/article/view.asp*
// @include http://www.nocutnews.co.kr/news/*
// @include http://www.newdaily.co.kr/news/article.html?no=*
// @include http://biz.newdaily.co.kr/news/article.html?no=*
// @include http://www.newsis.com/ar_detail/view.html*
// @include http://dailysecu.com/news_view.php*
// @include http://www.dailian.co.kr/news/view/*
// @include http://news.donga.com/Main/*
// @include http://news.donga.com/List/*
// @include http://news.donga.com/Politics/*
// @include http://news.donga.com/Economy/*
// @include http://news.donga.com/Inter/*
// @include http://news.donga.com/Society/*
// @include http://news.donga.com/Culture/*
// @include http://news.donga.com/It/*
// @include http://news.donga.com/People/*
// @include http://www.dt.co.kr/contents.html*
// @include http://www.reuters.com/article/*
// @include http://www.mydaily.co.kr/new_yk/html/read.php*
// @include http://news.mk.co.kr/newsRead.php*
// @include http://news.mt.co.kr/mtview.php*
// @include http://www.munhwa.com/news/view.html*
// @include http://www.mediatoday.co.kr/news/articleView.html*
// @include http://www.bloter.net/archives/*
// @include http://economy.hankooki.com/lpage*
// @include http://www.seoul.co.kr/news/newsView.php*
// @include http://www.segye.com/content/html/*
// @include http://sports.donga.com/home/3/*
// @include http://sports.donga.com/list/3/*
// @include http://sports.donga.com/Baseball/3/*
// @include http://sports.donga.com/Soccer/3/*
// @include http://sports.donga.com/Entertainment/3/*
// @include http://sports.donga.com/It/3/*
// @include http://sports.donga.com/Series/3/*
// @include http://sports.chosun.com/news/utype.htm*
// @include http://news.inews24.com/php/news_view.php*
// @include http://joynews.inews24.com/php/news_view.php*
// @include http://www.ohmynews.com/NWS_Web/View/at_pg.aspx*
// @include http://kr.wsj.com/posts/*
// @include http://www.etnews.com/*
// @include http://biz.chosun.com/site/data/html_dir/*
// @include http://news.chosun.com/site/data/html_dir/*
// @include http://koreajoongangdaily.joins.com/news/article/article.aspx*
// @include http://joongang.joins.com/article/*
// @include http://www.zdnet.co.kr/news/news_view.asp*
// @include http://www.jiji.com/jc/c?g=*
// @include http://www.koreatimes.co.kr/www/news/*
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
// @include http://www.huffingtonpost.kr/*
// @include http://biz.heraldcorp.com/view.php?*
// @include http://news.heraldcorp.com/view.php?*
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
var where = function (hostname) { // window.location.hostname
    switch (hostname) {
    case 'news.jtbc.joins.com': return 'JTBC';
    case 'news.kbs.co.kr': return 'KBS';
    case 'world.kbs.co.kr': return 'KBS World';
    case 'imnews.imbc.com': return 'MBC';
    case 'mbn.mk.co.kr': case 'www.mbn.co.kr': return 'MBN';
    case 'osen.mt.co.kr': return 'OSEN';
    case 'news.sbs.co.kr': return 'SBS';
    case 'www.ytn.co.kr': return 'YTN';
    case 'news.khan.co.kr': return '경향신문';
    case 'news.kmib.co.kr': return '국민일보';
    case 'www.nocutnews.co.kr': return '노컷뉴스';
    case 'www.newdaily.co.kr': return '뉴데일리';
    case 'biz.newdaily.co.kr': return '뉴데일리경제';
    case 'www.newsis.com': return '뉴시스';
    case 'dailysecu.com': return '데일리시큐';
    case 'www.dailian.co.kr': return '데일리안';
    case 'news.donga.com': return '동아일보';
    case 'www.dt.co.kr': return '디지털타임스';
    case 'www.reuters.com': return '로이터';
    case 'www.mydaily.co.kr': return '마이데일리';
    case 'news.mk.co.kr': return '매일경제';
    case 'news.mt.co.kr': return '머니투데이';
    case 'www.munhwa.com': return '문화일보';
    case 'www.mediatoday.co.kr': return '미디어오늘';
    case 'www.bloter.net': return '블로터닷넷';
    case 'economy.hankooki.com': return '서울경제';
    case 'www.seoul.co.kr': return '서울신문';
    case 'www.segye.com': return '세계일보';
    case 'sports.donga.com': return '스포츠동아';
    case 'sports.chosun.com': return '스포츠조선';
    case 'news.inews24.com': case 'joynews.inews24.com': return '아이뉴스24';
    case 'www.ohmynews.com': return '오마이뉴스';
    case 'kr.wsj.com': return '월스트리트저널';
    case 'www.etnews.com': return '전자신문';
    case 'biz.chosun.com': return '조선비즈';
    case 'news.chosun.com': return '조선일보';
    case 'koreajoongangdaily.joins.com': return '중앙데일리';
    case 'joongang.joins.com': return '중앙일보';
    case 'www.zdnet.co.kr': return '지디넷코리아';
    case 'www.jiji.com': return '지지통신';
    case 'www.koreatimes.co.kr': return '코리아타임스';
    case 'www.koreaherald.com': return '코리아헤럴드';
    case 'www.fnnews.com': return '파이낸셜뉴스';
    case 'www.pressian.com': return '프레시안';
    case 'www.hani.co.kr': return '한겨레';
    case 'www.hankyung.com': case 'ent.hankyung.com': case 'golf.hankyung.com': case 'land.hankyung.com': case 'stock.hankyung.com': return '한국경제';
    case 'www.wowtv.co.kr': return '한국경제TV';
    case 'www.hankookilbo.com': return '한국일보';
    case 'www.huffingtonpost.kr': return '허핑턴포스트';
    case 'biz.heraldcorp.com': case 'news.heraldcorp.com': return '헤럴드경제';
    default: throw new Error('jews don\'t support this site');
    }
};
function parse(where, jews) {
    if (typeof parse[where] === 'function') parse[where](jews);
}
parse['JTBC'] = function (jews) {
    jews.title = $('#articletitle .title h3').text();
    jews.subtitle = $('#sub_articletitle .title h4').html() || undefined;
    jews.content = (function () {
        var content = $('#articlebody .article_content')[0].cloneNode(true);
        $('.article_msn_ad, #id_movie_area, .article_list, .regard_area', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.artical_date').children();
        var lastModified;
        if (parsedData.length > 1) {
            lastModified = new Date(parsedData.eq(1).text().replace('수정 ', '').replace(/-/g, '/'));
        }
        return {
            created: new Date(parsedData.eq(0).text().replace('입력 ', '').replace(/-/g, '/')),
            lastModified: lastModified
        };
    })();
    jews.reporters = (function () {
        var result = [];
        var textReporter = $('#textReporter_area dl');
        var cameraReporter = $('#cameraReporter_area dl');
        var editReporter = $('#editReporter_area dl');
        [textReporter, cameraReporter, editReporter].forEach(function (v) {
            if (v.length > 0) {
                result.push({
                    name: $('.name', v).contents().eq(0).text().trim(),
                    mail: $('.sns a[href^="mailto:"]', v).eq(0).attr('href').replace('mailto:', '')
                });
            }
        });
        return result;
    })();
};
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
parse['YTN'] = function (jews) {
    jews.title = $('.article_headline').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#newsContent')[0].cloneNode(true);
        $('.articleAd_new, .hns_mask_div', content).remove();
        $('.playbt, .vState, .vodinfoButton', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#d_date').text().trim().replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [];
    jews.pesticide = function () {
        $('.dklink', content).each(function (_, link) {
            $(link).replaceWith($(link).text());
        });
    };
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
            created: new Date(parsedData.eq(0).text().replace(/입력\s*:/, '').replace(/-/g, '/')),
            lastModified: new Date(parsedData.eq(2).text().replace(/수정\s*:/, '').replace(/-/g, '/'))
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
parse['국민일보'] = function (jews) {
    jews.title = $('.NwsCon .nwsti h2').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = clearStyles($('#articleBody')[0].cloneNode(true));
        var fbPost = $('#articleBody .fb-post');
        if (fbPost.length > 0) {
            $('.fb-post', content).replaceWith(fbPost[0].outerHTML);
        }
        return content.innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.NwsCon .nwsti .date .t11');
        return {
            created: new Date(parsedData.eq(0).text().replace(/-/g, '/')),
            lastModified: parsedData.length > 1 ? new Date(parsedData.eq(1).text().replace(/-/g, '/')) : lastModified
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
    jews.pesticide = function () {
        $('#scrollDiv').remove();
    };
};
parse['노컷뉴스'] = function (jews) {
    jews.title = $('.reporter_info h2').text();
    jews.subtitle = $('.viewbox h3').text();
    jews.content = (function () {
        var content = $('#pnlContent')[0].cloneNode(true);
        $('.relatednews', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.reporter_info ul li:first-child span').text().replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = [{
        name: $('.reporter_info .email span').text(),
        mail: $('.reporter_info .email a').attr('title')
    }];
    jews.pesticide = function () {
        $('#scrollDiv').remove();
    };
};
parse['뉴데일리'] = function (jews) {
    var a = document.getElementById('ndArtTit'),
        b = a.querySelectorAll('#ndArtOption>li'),
        c = b[2].childNodes,
        i = -1, j;
    while (j = c[++i]) {
        if (j.nodeType === 3) break;
    }
    j = j.textContent;
    jews.title = a.getElementsByTagName('h1')[0].innerText;
    jews.subtitle = a.getElementsByTagName('h2')[0].innerText;
    jews.content = document.getElementById('ndArtBody').innerHTML
                        .split(/<!--.+?기사본문\s*하단.+?-->/)[0].trim()
                        .replace(/(?:style|width|height)=(?:"[^"]+?"|'[^']+?')/g, '').replace(/<p><br><\/p>/g, '');
    jews.timestamp = {
        'created': undefined,
        'lastModified': new Date(b[0].getElementsByTagName('span')[0].innerText.trim().replace(/\./g, '-').replace(' ', 'T') + '+09:00') // ISO 8601
    };
    jews.reporters = [{
        'name': j,
        'mail': b[4].getElementsByTagName('a')[0].innerText.trim().split(' ', 1)[0]
    }];
};
parse['뉴데일리경제'] = function (jews) {
    var $ = function (b) { return document.querySelector(b); },
        a = [].slice.call($('.arvdate').childNodes).filter(function (v) { return v.nodeType === 3; })[0].textContent.trim();
    jews.title = $('.hbox>h2').innerText.trim();
    jews.subtitle = $('.hbox>h3').innerText.trim();
    jews.reporters = [{
        'name': $('.arvdate>a').innerText.replace('뉴데일리경제', '').trim(),
        'mail': a.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i)[0]
    }];
    jews.timestamp = {
        'created': new Date(a.match(/\d{4}\.\d{2}.\d{2}\s+\d{2}:\d{2}:\d{2}/)[0].replace(/\./g, '-').replace(/\s+/, 'T') + '+09:00'), // ISO 8601
        'lastModified': undefined
    };
    jews.content = clearStyles(document.getElementById('news_body_area')).innerHTML;
};
parse['뉴시스'] = function (jews) {
    jews.title = $('.viewnewstitle').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#articleBody')[0].cloneNode(true);
        var centerImage = $('.center_img')[0].cloneNode(true);
        // $('.relatednews', content).remove();
        return clearStyles(centerImage).innerHTML + clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var $time = $('font', $('.viewnewstitle').closest('tbody'));
        return {
            created: new Date($time.eq(0).text().replace(/\[|\]/g, '').replace(/-/g, '/')),
            lastModified: $time.eq(1).text() ? new Date($time.eq(1).text().replace(/\[|\]/g, '').replace(/-/g, '/')) : undefined
        };
    })();
    jews.reporters = [];
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
parse['데일리안'] = function (jews) {
    jews.title = $('#view_titlebox .view_titlebox_r1').text();
    jews.subtitle = $('#view_titlebox .view_subtitle')[0].innerHTML.trim();
    jews.content = (function () {
        var content = $($('#view_con')[0].cloneNode(true));
        $('a.dklink', content).each(function (i, el) {
            $(el).replaceWith(el.textContent);
        });
        $('.contents_img', content).each(function (i, el) {
            el.removeAttribute('width');
        });
        return clearStyles(content[0]).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#view_titlebox2_3 span').text().replace('등록 : ', '').replace(/-/g, '/')),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var parsedData = $('#view_page .view_title_sub').eq(0).contents()[0].textContent.trim();
        var matches = parsedData.match(/(.*)\((.*)\)/);
        return [{
            name: matches[1],
            mail: matches[2]
        }];
    })();
};
parse['동아일보'] = function (jews) {
    jews.title = $('.article_title h1').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('.article_txt')[0].cloneNode(true);
        $('.title_foot', content).remove();
        $('.txt_ad, [class^=sub_cont_AD]', content).remove();
        $('.article_relation', content).remove();
        $('.t_sns', content).remove();
        $('[alt="기자의 다른기사 더보기"]', content).parent().remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.title_foot .date').text().replace(/-/g, '/')),
        lastModified: new Date($('.title_foot .date2').text().replace(/-/g, '/'))
    };
    jews.reporters = [{
        name: $('.repoter').text(),
        mail: undefined
    }];
    jews.pesticide = function () {
        $('#scrollDiv').remove();
    };
};
parse['디지털타임스'] = function (jews) {
    jews.title = $('#news_names h1').text();
    jews.subtitle = $('#news_names h3').text();
    jews.content = (function () {
        var content = $('#NewsAdContent')[0].cloneNode(true);
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor)[0].innerHTML);
        });
        $('[alt="DT Main"]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = /입력: (....-..-.. ..:..)/.exec($('#news_names p').text());
        return {
            created: (parsedData === null) ? undefined : new Date(parsedData[1].replace(/-/g, '/')),
            lastModified: undefined
        };
    })();
    jews.reporters = [{
        name: $('#news_names p')[0].childNodes[0].textContent.trim(),
        mail: $('#news_names p [href^=mailto]').text()
    }];
    jews.pesticide = function () {
        $('#soeaLayerLoc_fi').remove();
    };
};
parse['로이터'] = function (jews) {
    jews.title = $('#content > .main-content > .sectionContent h1').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var header = '';
        var articleImage = $('#articleImage')[0];
        if (articleImage) {
            header += clearStyles(articleImage.cloneNode(true)).innerHTML;
        }
        if ($('#slideshowInlineLarge+script')[0]) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', $('#slideshowInlineLarge+script')[0].innerText.split(/'sJSON'|"sJSON"/g).pop().match(/\/assets\/[^']+/), true);
            xhr.onreadystatechange = function () {
                if (this.readyState === (this.DONE || 4)) {
                    var r = this.responseText;
                    var imgJSON = new Function(
                        'return ' + r.substring(r.indexOf('{'), r.lastIndexOf('}') + 1)
                    )();
                    imgJSON = imgJSON && imgJSON.slideshow && imgJSON.slideshow.slides; // Bro, do you even javascript?
                    if (!imgJSON) return;
                    var slides = document.createElement('div');
                    slides.className = 'slideshow';
                    slides.style.width = '100%';
                    slides.style.whiteSpace = 'nowrap';
                    slides.style['overflow-x'] = 'scroll';
                    var style = document.createElement('style');
                    style.innerText = '.slideshow figure{display: inline-block} .slideshow figure>figcaption{white-space: normal}';
                    slides.appendChild(style);
                    imgJSON.forEach(function (v) {
                        /*
                        * <figure>
                        *     <img src="/sample.jpg">
                        *     <figcaption>caption message</figcaption>
                        * </figure>
                        */
                        var fig = document.createElement('figure'),
                            el = document.createElement('img'),
                            caption = document.createTextNode(v.caption);
                        el.src = v.image;
                        fig.appendChild(el);
                        el = document.createElement('figcaption');
                        el.appendChild(caption);
                        fig.appendChild(el);
                        slides.appendChild(fig);
                    });
                    var runLittleLater = (function (slides) {
                        return function () {
                            var jewsContent = document.getElementById('content');
                            jewsContent.insertBefore(slides, jewsContent.firstChild);
                        };
                    })(slides);
                    window.setTimeout(runLittleLater, 500);
                }
            };
            xhr.send();
        }
        return header + clearStyles($('#articleText')[0].cloneNode(true)).innerHTML;
    })();
    jews.timestamp = (function () {
        var rawDate = $('#articleInfo .timestamp').text().split(' ');
        var time = rawDate[rawDate.length - 2].match(/(\d+):(\d{2})(p?)/);
        time = parseInt(time[1], 10) + (time[3] ? 12 : 0) + ':' + time[2];
        rawDate[rawDate.length - 2] = time;
        return {
            created: new Date(rawDate.join(' ')),
            lastModified: undefined
        };
    })();
    jews.reporters = (function () {
        var result = [];
        var rawReporters = $('#articleInfo .byline').text().replace(/By /, '');
        if (rawReporters !== "") {
            // Reporters exist.
            rawReporters = rawReporters.split(' and ');
            if (rawReporters.length > 1) {
                // There are more than one reporter.
                rawReporters[0].split(',').forEach(function (v) {
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
    jews.pesticide = function () {
        $('#trackbar, iframe').remove();
    };
};
parse['마이데일리'] = function (jews) {
    jews.title = $('#Read_Part h1').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#article')[0].cloneNode(true);
        $('div.mask_div, div[align="center"][style="margin-left:14px"], div[style="float:right; width:200px; height:200px; margin:0 !important; padding:0 !important; background:#fff; border:1px solid #ccc;"]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('#Read_Part h2').contents().eq(0).text().trim().replace(/(\d{2})-(\d{2})-(\d{2})(.*)/, "20$1/$2/$3$4")),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var match = $('#article > b').eq(-1).text().match(/(.*)\s(.*@.*)/);
        return [{
            name: match[1],
            mail: match[2]
        }];
    })();
};
parse['매일경제'] = function (jews) {
    jews.title = $('.head_tit').text();
    jews.subtitle = $('.sub_tit').text();
    jews.content = (function () {
        var content = $('#artText')[0].cloneNode(true);
        return $('.read_txt, .center_image', content).toArray().map(function (el) {
            $('[id^=google_dfp]', el).remove();
            return $(clearStyles(el)).html();
        }).join('');
    })();
    jews.timestamp = {
        created: new Date($('#view_tit .sm_num').eq(0).text().replace(/\./g, '/')),
        lastModified: new Date($('#view_tit .sm_num').eq(1).text().replace(/\./g, '/'))
    };
    jews.reporters = [];
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
                name: $(this).text().replace(/ 기자$/, ''),
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
parse['문화일보'] = function (jews) {
    jews.title = $('.title').text();
    jews.subtitle = $('.sub_title').eq(0).text();
    jews.content = (function () {
        var content = $('#NewsAdContent')[0].cloneNode(true);
        $('.article_msn_ad', content).remove();
        var figure = $('table[align=center]', $('#view_body').prev())[0];
        if (figure) {
            figure = figure.cloneNode(true);
            figure = clearStyles(figure).innerHTML;
        } else {
            figure = '';
        }
        return figure + clearStyles(content).innerHTML;
    })();
    var created = /게재 일자 :(.+?)년(.+?)월(.+?)일/.exec($('td', $('.title').closest('table').prev().prev()).eq(1).text());
    created.shift();
    jews.timestamp = {
        created: new Date(created.map(function (d) { return +d; }).join('/')),
        lastModified: undefined
    };
    jews.reporters = [];
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
    jews.content = clearStyles(document.getElementsByClassName('press-context-news')[0].cloneNode(true)).innerHTML;
    jews.timestamp = {
        created: new Date(document.querySelector('meta[property="article:published_time"]').content),
        lastModified: new Date(document.querySelector('meta[property="article:modified_time"]').content)
    };
    var author = document.getElementsByClassName('press-context-author')[0];
    jews.reporters = [{
        name: author.getElementsByTagName('cite')[0].innerText,
        mail: author.getElementsByTagName('a')[0].href.match(/bloter\.net\/archives\/author\/([^\/\?\s]+)/)[1]+'@bloter.net'
    }];
};
parse['서울경제'] = function (jews) {
    jews.title = $('#GS_Title').text();
    jews.subtitle = $('#GS_SubTitle').text();
    jews.content = (function () {
        var content = $('#GS_Content')[0].cloneNode(true);
        $('#frm_AD_GISA_PHOTO_LINE', content).remove();
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor)[0].innerHTML);
        });
        var photo = $('#GS_RelPhoto')[0];
        var photoDiv = document.createElement('div');
        var imgs = '';
        if (photo) {
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
        lastModified: new Date($('#modify_gisa').eq(0).text().replace('수정시간 :', '').trim())
    };
    jews.reporters = $('#GS_Reporter ul li').toArray().map(function (li) {
        li = li.cloneNode(true);
        var mail = $('a', li).text();
        $('a', li).remove();
        var name = $(li).text();
        return { name: name, mail: mail };
    });
    jews.pesticide = function () {
        $('#frm_photoLink').remove();
    };
};
parse['서울신문'] = function (jews) {
    jews.title = $('.title_main').contents().eq(0).text().trim();
    jews.subtitle = $('.title_sub').text() || undefined;
    jews.content = (function () {
        var content = $('#atic_txt1')[0].cloneNode(true);
        $('#hnsIframe, #ifrm_photolink, #googleAdTable', content).remove();
        $('.dklink', content).each(function (i, v) {
            $(v).replaceWith(v.innerHTML);
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.VCdate').text().trim().split(' ')[0]),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var parsedData = $('#atic_txt1').contents().filter(function (i, v) {
            return v.nodeType === 3 && v.textContent.match(/@seoul\.co\.kr/);
        });
        var reporters = [];
        parsedData.each(function (i, v) {
            var match = v.textContent.trim().match(/(.*)\s+(.*@.*)/);
            reporters.push({
                name: match[1],
                mail: match[2]
            });
        });
        return reporters;
    })();
};
parse['세계일보'] = function (jews) {
    jews.title = document.querySelector('.container>.content>.titleh1>h1').childNodes[0].textContent;
    jews.subtitle = document.querySelector('.container>.content>.titleh2>h2').innerText;
    jews.content = clearStyles(document.getElementById('article_txt')).innerHTML;
    jews.timestamp = { created: undefined, lastModified: undefined };
    document.getElementById('SG_ArticleDateLine').innerText
        .replace(/(입력|수정)\s*(\d{4}-\d{2}-\d{2})\s*(\d{2}:\d{2}:\d{2})/g, function(_, p1, p2, p3){
            var ts = p2 + 'T' + p3 + '+09:00'; // ISO 8601
            if (p1 === '입력') jews.timestamp.created = new Date(ts);
            else if (p1 === '수정') jews.timestamp.lastModified = new Date(ts);
        });
    var r = ('\n' + document.getElementById('article_txt').innerText + '\n').match(/\n([^\n@]+)\s기자\s([^가-힣\s\n]+@segye.com)\n/);
    jews.reporters = [];
    if (r) {
        jews.reporters.push({
            name: r[1],
            mail: r[2]
        });
    }
    jews.pesticide = function () {
        $('#scrollDiv, #realclick_view, script, iframe, .mask_div').remove();
    };
};
parse['스포츠동아'] = function (jews) {
    jews.title = document.querySelector('#sub_content>.article_cont>.article_tit>h3').innerText;
    jews.subtitle = undefined;
    jews.timestamp = {
        created: new Date(document.querySelector('#sub_content>.article_cont>.article_tit>p').innerText.replace('입력', '').trim().replace(/\s+/,'T')+'+09:00'),  // ISO 8601
        lastModified: undefined
    };
    jews.content = clearStyles(document.querySelector('#ct>div.article_word')).innerHTML;
    jews.pesticide = function () {
        [].forEach.call(document.getElementById('content').querySelectorAll('div:not([class^="article"]), script, iframe'), function (v) {
            v.parentNode.removeChild(v)
        });
    }
};
parse['스포츠조선'] = function (jews) {
    jews.title = $('.acle_c h1').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('.news_text .article')[0].cloneNode(true);
        $('#divBox, .mask_div, .gisa_banner', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.acle_c .a_day').text().split('|');
        var created = new Date(parsedData[0].replace('기사입력', '').replace(/-/g, '/').trim());
        var lastModified = parsedData[1] ? new Date(parsedData[1].replace('최종수정', '').replace(/-/g, '/').trim()) : undefined;
        return {
            created: created,
            lastModified: lastModified
        };
    })();
    jews.reporters = [];
};
parse['아이뉴스24'] = function (jews) {
    jews.title = $('.head_txt').text().trim();
    jews.subtitle = $('.shead_txt').text();
    jews.content = (function () {
        var content = $('#newContent4Img')[0].cloneNode(true);
        $('a[href="javascript:search_gija();"]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.location_txt').eq(0).text()
                         .replace(/(\d{4})\.(\d{2})\.(\d{2})\. . (\d{2}):(\d{2}).*/, '$1/$2/$3 $4:$5')),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var match = $('#newContent4Img').contents().eq(0).text().match(/^\[([^[]+)\]/);
        return [{
            name: match ? match[1] : undefined,
            mail: $('#newContent4Img a[href^="mailto:"]').text() || undefined
        }];
    })();
};
parse['오마이뉴스'] = function (jews) {
    jews.title = $('.newstitle .tit_subject a').text();
    jews.subtitle = $('.newstitle .tit_subtit a').text();
    jews.content = (function () {
        var content = $('.at_contents')[0].cloneNode(true);
        $('.atc_btn', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var lastModified = $('.newstitle .info_data div').eq(0).text().split(/최종 업데이트 |l/)[2];
        if (lastModified)
            lastModified = new Date('20' + lastModified.replace(/\./g, '/'));
        else
            lastModified = undefined;
        return {
            created: new Date('20' + $('.newstitle .info_data div')[0].childNodes[0].textContent.replace(/\./g, '/')),
            lastModified: lastModified
        };
    })();
    jews.reporters = [{
        name: $('.newstitle .info_data div a').eq(0).text(),
        mail: undefined
    }];
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
            if (/기사 번역 관련 문의: [A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i.exec(v.innerText)) {
                while (arr[i])
                    remove(arr[i]);
            }
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
parse['조선일보'] = function (jews) {
    jews.title = $('#title_text').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('.article')[0].cloneNode(true);
        $('.promotion', content).remove();
        $('div[class*=date_]', content).remove();
        $('#pop_videobox', content).remove();

        var image_box = $('.center_img_2011', content);
        image_box.forEach(function (el) {
            var idx = parseInt($(el).attr('id').match(/\d+/), 10);
            var player = $('#player' + idx);

            // Image Type 1 (Simple)
            if ($('dl > dd', player).length === 0) {
                $(el).replaceWith($('dl > div > img', player)[0].outerHTML);
                return;
            }

            // Image Type 2 (Without link)
            if ($('dl > dd > div > img', player).length !== 0) {
                $(el).replaceWith($('dl > dd > div > img', player)[0].outerHTML);
                return;
            }

            var link = $("dl > dd > div > a", el).attr('onclick');

            // Image Type 3 (With link)
            if (link === null) {
                $(el).replaceWith($('dl > dd > div > a > img', player)[0].outerHTML);
                return;
            }

            // Should I do this??
            if (typeof video_tags === 'undefined') {
                eval($(".article script")[0].text);
            }

            // Video
            var video_id = parseInt(link.match(/\d+/), 10);
            $(el).replaceWith(video_tags[video_id]);
        });

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
parse['중앙데일리'] = function (jews) {
    jews.title = $('#sTitle_a').text();
    jews.subtitle = $('#articletitle .title h4').text().trim() || undefined;
    jews.content = (function () {
        var content = $('#articlebody')[0].cloneNode(true);
        $('.article_middle_ad, .article_ad250', content).remove();
        $('table', content).each(function (i, v) {
            v.removeAttribute('width');
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date($('.date').text()),
        lastModified: undefined
    };
    jews.reporters = (function () {
        var parsedData = $('#articlebody').contents().filter(function (i, v) {
            return v.nodeType === 3 && v.textContent.match(/@joongang\.co\.kr/);
        });
        var reporters = [];
        parsedData.each(function (i, v) {
            var match = v.textContent.trim().match(/BY\s+(.*)\s+\[(.*@.*)\]/);
            reporters.push({
                name: match[1],
                mail: match[2]
            });
        });
        return reporters;
    })();
};
parse['중앙일보'] = function (jews) {
    jews.title = $('#articletitle .title h3').text();
    jews.subtitle = (function () {
        var el = document.querySelector('#articletitle .title h4');
        if (el === null) return undefined;
        return el.innerHTML;
    })();
    jews.content = (function () {
        var content = $('#article_content')[0].cloneNode(true);
        $('#__inline_ms_da_ad__', content).remove();
        $('#relation_news', content).remove();
        $('span', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var text = $('.artical_date .date').text().split('/');

        var match = text[0].match(/입력 (\d{4}).(\d{2}).(\d{2}) (\d{2}):(\d{2})/);
        var created_date = new Date();
        created_date.setYear(parseInt(match[1], 10));
        created_date.setMonth(parseInt(match[2], 10) - 1);
        created_date.setDate(parseInt(match[3], 10));
        created_date.setHours(parseInt(match[4], 10));
        created_date.setMinutes(parseInt(match[5], 10));
        created_date.setSeconds(0);

        var lastModified_date;
        if (text.length > 1) {
            match = text[1].match(/수정 (\d{4}).(\d{2}).(\d{2}) (\d{2}):(\d{2})/);
            lastModified_date = new Date();
            lastModified_date.setYear(parseInt(match[1], 10));
            lastModified_date.setMonth(parseInt(match[2], 10) - 1);
            lastModified_date.setDate(parseInt(match[3], 10));
            lastModified_date.setHours(parseInt(match[4], 10));
            lastModified_date.setMinutes(parseInt(match[5], 10));
            lastModified_date.setSeconds(0);
        }
        return {
            created: created_date,
            lastModified: lastModified_date
        };
    })();
    jews.reporters = (function() {
        var reporters = $('#journalist_info li');
        var list = [];

        reporters.forEach(function (el) {
            var name = $(el).text().trim().match(/(.*?) 기자/)[1];
            var mail, mail_el = $('.email a', el);
            if (mail_el !== null) mail = mail_el.text();

            list.push({
                name: name,
                mail: mail
            });
        });

        return list;
    })();
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
parse['지지통신'] = function (jews) {
    jews.title = $('#article-title').text();
    jews.subtitle = undefined;
    jews.content = clearStyles($('#article-body')[0].cloneNode(true)).innerHTML;
    jews.timestamp = {
        created: undefined,
        lastModified: undefined
    };
    jews.reporters = [];
    jews.pesticide = function () {
        $('iframe, [id^=goog], [id^=popIn_menu]').remove();
    };
};
parse['코리아타임스'] = function (jews) {
    jews.title = $('.view_page_news .view_page_news_header_wrapper h1').text().trim();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#p')[0].cloneNode(true);
        $('#webtalks_btn_listenDiv', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.view_page_news .view_page_news_header_wrapper span');
        var nbsp = String.fromCharCode(0xA0);
        return {
            created: new Date(parsedData.eq(0).text().replace(nbsp, ' ').replace('Posted : ', '').replace(/-/g, '/')),
            lastModified: new Date(parsedData.eq(1).text().replace(nbsp, ' ').replace('Updated : ', '').replace(/-/g, '/'))
        };
    })();
    jews.reporters = (function () {
        var name = $('#p > span').eq(0).contents().filter(function (i, v) {
            return v.nodeType === 3 && v.textContent.match(/^By (.+)$/);
        });
        name = (name.length > 0) ? name[0].textContent.match(/^By (.+)$/)[1] : undefined;
        var mail = $('.view_page_translation_email a').attr('href');
        return [{
            name: name,
            mail: mail ? mail.replace('mailto:', '') : undefined
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
    jews.pesticide = function () {
        $('#scrollDiv').remove();
    };
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
parse['허핑턴포스트'] = function (jews) {
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
    jews.content = mainImageContent + mainVideoContent + clearStyles($('#mainentrycontent')[0]).innerHTML;
    jews.timestamp = {
        created: new Date($('.posted time[datetime]').attr('datetime')),
        lastModified: new Date($('.updated time[datetime]').attr('datetime'))
    };
    jews.reporters = (function () {
        var reporter = /\ ([가-힣]{2,4})(\ 기자)?/.exec($('.name.fn').text().trim());
        return [{
            name: reporter ? reporter[1] : $('a[rel="author"]').text(),
            mail: undefined
        }];
    })();
    jews.pesticide = function () {
        var $share = $('a[href*="mailto"]');
        if ($share.length) {
            $($share[0].parentNode).remove();
        }
        $('.pinitshareimage').remove();
        $('.ad_wrapper').remove();
        $('.hp-slideshow-wrapper').remove();
    };
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
    if (typeof context === 'string' || context instanceof String) {
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
    else if (typeof selector === 'string' || selector instanceof String)
        $.merge(this, context.querySelectorAll(selector));
    else if (selector && selector.length)
        $.merge(this, selector);
};
$.fn.init.prototype.attr = function (attributeName) {
    if (this[0] && this[0].getAttribute)
        return this[0].getAttribute(attributeName);
    return undefined;
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
    return $();
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
    if (typeof selector === 'string' || selector instanceof String) {
        for (i = 0; i < this.length; ++i) {
            if ($.matches(this[i], selector))
                result.push(this[i]);
        }
    } else if (typeof selector === 'function') {
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
$.fn.init.prototype.html = function () {
    if (this[0]) {
        return this[0].innerHTML;
    } else {
        return null;
    }
};
$.fn.init.prototype.parent = function (item) {
    return this[0] ? $(this[0].parentElement) : $();
};
$.fn.init.prototype.prev = function (item) {
    return this[0] ? $(this[0].previousElementSibling) : $();
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

if ('undefined' === typeof window) {
    module.exports = parse;
} else {
    var run = function (e) {
        parse(where(window.location.hostname), jews);
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
                    'display: block;',
                    'margin: 15px auto;',
                    'max-width: 100%;',
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
    };
    if (document.readyState === 'interactive' || document.readyState === 'complete') run();
    else window.addEventListener('DOMContentLoaded', run, true);
}
