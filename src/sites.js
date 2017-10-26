// 이 파일은 'dev/fuse.js'를 위해서 js 파일로 유지해야 해요.

exports.__esModule = true;
exports.default = {
    // i
    'ITWORLD': ['http://www.itworld.co.kr/news/*'],
    // j
    'JTBC': ['http://news.jtbc.joins.com/article/*', 'http://news.jtbc.joins.com/html/*'],
    // k
    'KBS': ['http://news.kbs.co.kr/news/view.do?*'],
    'KBS World': ['http://world.kbs.co.kr/*/news/news_*_detail.htm*'],
    // m
    'MBC': ['http://imnews.imbc.com/*'],
    'MBN': ['http://mbn.mk.co.kr/pages/news/newsView.php*', 'http://www.mbn.co.kr/pages/news/newsView.php*'],
    // o
    'OSEN': ['http://osen.mt.co.kr/article/*'],
    // s
    'SBS': ['http://news.sbs.co.kr/news/endPage.do*'],
    // y
    'YTN': ['http://www.ytn.co.kr/_ln/*'],
    // ㄱ
    '경향비즈': ['http://bizn.khan.co.kr/khan_art_view.html*'],
    '경향신문': ['http://news.khan.co.kr/kh_news/khan_art_view.html*'],
    '국민일보': ['http://news.kmib.co.kr/article/view.asp*'],
    // ㄴ
    '나우뉴스': ['http://nownews.seoul.co.kr/news/newsView.php*'],
    '네이버뉴스': ['http://news.naver.com/main/*/read.nhn*', 'http://news.naver.com/main/read.nhn*'],
    '노컷뉴스': ['http://www.nocutnews.co.kr/news/*'],
    '뉴데일리': ['http://www.newdaily.co.kr/news/article.html?no=*', 'http://pk.newdaily.co.kr/news/article.html?no=*', 'http://tk.newdaily.co.kr/news/article.html?no=*'],
    '뉴데일리경제': ['http://biz.newdaily.co.kr/news/article.html?no=*'],
    '뉴스1': ['http://www.news1.kr/articles/*', 'http://news1.kr/articles/*'],
    '뉴시스': ['http://www.newsis.com/ar_detail/view.html*'],
    // ㄷ
    '데일리시큐': ['http://dailysecu.com/news_view.php*'],
    '데일리안': ['http://www.dailian.co.kr/news/view/*'],
    '데일리한국': ['http://daily.hankooki.com/lpage/*'],
    '동아일보': ['http://news.donga.com/3/*', 'http://news.donga.com/*/3/*'],
    '디스패치': ['http://www.dispatch.co.kr/*'],
    '디지털타임스': ['http://www.dt.co.kr/contents.html*'],
    // ㄹ
    '로이터': ['http://www.reuters.com/article/*'],
    // ㅁ
    '마이데일리': ['http://www.mydaily.co.kr/new_yk/html/read.php*'],
    '매일경제': ['http://news.mk.co.kr/newsRead.php*', 'http://nnews.mk.co.kr/newsRead.php*'],
    '머니투데이': ['http://www.mt.co.kr/view/mtview.php*', 'http://news.mt.co.kr/mtview.php*', 'http://cnews.mt.co.kr/mtview.php*'],
    '문화일보': ['http://www.munhwa.com/news/view.html*'],
    '미디어스': ['http://www.mediaus.co.kr/news/articleView.html*'],
    '미디어오늘': ['http://www.mediatoday.co.kr/news/articleView.html*'],
    '민중의소리': ['http://www.vop.co.kr/A*.html'],
    // ㅂ
    '뷰스앤뉴스': ['http://www.viewsnnews.com/article/view.jsp*', 'http://viewsnnews.com/article/view.jsp*'],
    '블로터닷넷': ['http://www.bloter.net/archives/*'],
    // ㅅ
    '서울경제': ['http://economy.hankooki.com/lpage/*'],
    '서울신문': ['http://seoul.co.kr/news/newsView.php*', 'http://www.seoul.co.kr/news/newsView.php*'],
    '세계일보': ['http://www.segye.com/content/html/*'],
    '스포츠경향': ['http://sports.khan.co.kr/news/sk_index.html?*'],
    '스포츠동아': ['http://sports.donga.com/3/*', 'http://sports.donga.com/*/3/*'],
    '스포츠서울': ['http://www.sportsseoul.com/news/read/*'],
    '스포츠조선': ['http://sports.chosun.com/news/ntype.htm*', 'http://sports.chosun.com/news/ntype5.htm*', 'http://sports.chosun.com/news/utype.htm*'],
    '스포탈코리아': ['http://www.sportalkorea.com/news/view.php*', 'http://www.sportalkorea.com/newsplus/view_sub.php*'],
    '시사IN Live': ['http://www.sisainlive.com/news/articleView.html?*'],
    // ㅇ
    '아시아경제': ['http://www.asiae.co.kr/news/view.htm*', 'http://car.asiae.co.kr/view.htm*', 'http://edu.asiae.co.kr/view.htm*', 'http://gold.asiae.co.kr/view.htm*', 'http://golf.asiae.co.kr/view.htm*', 'http://stock.asiae.co.kr/news/view.htm*', 'http://view.asiae.co.kr/news/view.htm*'],
    '아시아투데이': ['http://www.asiatoday.co.kr/view.php*'],
    '아이뉴스24': ['http://news.inews24.com/php/news_view.php*', 'http://joynews.inews24.com/php/news_view.php*'],
    '여성뉴스': ['http://www.womennews.co.kr/news/*'],
    '연합뉴스': ['http://www.yonhapnews.co.kr/*AKR*.HTML*'],
    '오마이뉴스': ['http://www.ohmynews.com/NWS_Web/View/at_pg.aspx*'],
    '월스트리트저널': ['http://kr.wsj.com/posts/*', 'http://realtime.wsj.com/korea/*'],
    '이데일리': ['http://www.edaily.co.kr/news/NewsRead.edy*', 'http://starin.edaily.co.kr/news/NewsRead.edy*'],
    '일간스포츠': ['http://isplus.joins.com/article/*', 'http://isplus.live.joins.com/news/article/article.asp*'],
    // ㅈ
    '전자신문': ['http://www.etnews.com/*'],
    '조선비즈': ['http://biz.chosun.com/site/data/html_dir/*'],
    '조선일보': ['http://news.chosun.com/site/data/html_dir/*'],
    '중앙데일리': ['http://koreajoongangdaily.joins.com/news/article/article.aspx*'],
    '중앙일보': ['http://joongang.joins.com/article/*', 'http://article.joins.com/news/article/article.asp*', 'http://news.joins.com/article/*'],
    '지디넷코리아': ['http://www.zdnet.co.kr/news/news_view.asp*', 'http://www.zdnet.co.kr/column/column_view.asp*'],
    '지지통신': ['http://www.jiji.com/jc/c?g=*'],
    // ㅋ
    '코리아타임스': ['http://www.koreatimes.co.kr/www/news/*'],
    '코리아헤럴드': ['http://www.koreaherald.com/view.php*', 'http://khnews.kheraldm.com/view.php*'],
    // ㅍ
    '파이낸셜뉴스': ['http://www.fnnews.com/news/*'],
    '프레시안': ['http://www.pressian.com/news/article.html*'],
    // ㅎ
    '한겨레': ['http://hani.co.kr/arti/*', 'http://www.hani.co.kr/arti/*'],
    '한국경제': ['http://www.hankyung.com/news/app/newsview.php*', 'http://ent.hankyung.com/news/app/newsview.php*', 'http://golf.hankyung.com/news/app/newsview.php*', 'http://land.hankyung.com/news/app/newsview.php*'],
    '한국경제증권': ['http://stock.hankyung.com/news/app/newsview.php*'],
    '한국경제TV': ['http://www.wowtv.co.kr/newscenter/news/view.asp*'],
    '한국일보': ['http://www.hankookilbo.com/v/*', 'http://hankookilbo.com/v/*'],
    '허핑턴포스트': ['http://www.huffingtonpost.kr/*'],
    '헤럴드경제': ['http://biz.heraldcorp.com/view.php?*', 'http://news.heraldcorp.com/view.php?*'],
};
