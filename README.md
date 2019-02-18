# just-news

[![travis](https://travis-ci.org/disjukr/just-news.svg)](https://travis-ci.org/disjukr/just-news)

뉴스 사이트 기사 페이지에 접속하면 뉴스 본문외의 정보를 전부 제거한 뒤 페이지를 재구성하는 스크립트입니다.

모든 주요 웹브라우저(인터넷 익스플로러 제외)에 대해 최신 안정버전으로부터 한 버전 전까지만 지원합니다.


## 설치하기

just-news는 뉴스 기사 페이지에서 작동되는 유저스크립트이며,
자동으로 실행되기 위해서는 유저스크립트 플러그인의 도움이 필요합니다.

### 유저스크립트 플러그인 설치

유저스크립트 플러그인은 여러 종류가 있지만 just-news는 [Tampermonkey](http://tampermonkey.net/) 사용을 권장합니다.
Tampermonkey는 크롬, 파이어폭스, 엣지, 사파리, 오페라 등의 웹브라우저를 지원합니다.

Tampermonkey 외에도
[Greasemonkey](http://www.greasespot.net/),
[Violentmonkey](https://github.com/violentmonkey/violentmonkey),
[NinjaKit](https://github.com/os0x/NinjaKit) 등의 유저스크립트 플러그인이 있습니다.

### [스크립트 설치](https://github.com/disjukr/just-news/raw/release/dist/just-news.user.js)

유저스크립트 플러그인이 설치됐다면 위 링크를 클릭하면 자동으로 just-news 설치창이 뜹니다.


## 기여하는 법

### 버그 제보하기

just-news는 GitHub issue tracker를 사용합니다.
이슈는 <https://github.com/disjukr/just-news/issues>로 제보해주시기 바랍니다.

### 소스코드로 기여하기

1. 구현하고 싶은 뉴스 사이트를 정합니다.
    1. 뉴스 사이트가 하단의 지원 사이트 목록에 체크되어있지 않은지 확인합니다.
    2. 목록에 사이트가 없으면 추가합니다.
2. 구현합니다.
    1. `src/sites.ts`에 뉴스사 이름을 키로 갖는, 주소 패턴 목록을 추가합니다.
    2. `src/impl` 경로에 `article` 객체를 반환하는 `parse` 함수를 담은 모듈을 작성합니다.
        1. 모듈 이름은 뉴스사 이름으로 합니다.
        2. 비동기로 작동해야할 경우 `Promise` 객체를 반환하면 됩니다.
        3. 특정 뉴스기사에서만 작동하는 코드의 경우 해당 뉴스기사 url을 주석으로 적어주세요.
3. 지원 사이트 목록에 구현한 항목을 체크하고 Pull Request를 보냅니다.

### 소스코드 빌드하기

이 프로젝트는 [webpack](https://webpack.js.org/)을 사용하여 `just-news.user.js` 파일을 빌드합니다.
빌드를 하기 위해 다음의 절차를 따라야 합니다.

1. [nodejs](https://nodejs.org/)를 설치합니다.
2. `npm install` 명령을 실행합니다.
3. `npm run build` 명령을 실행합니다.
    - `npm run build` 명령은 minify된 결과물을 주기 때문에 처리가 너무 오래걸릴 수 있습니다.
      빠르게 개발용 빌드를 얻고 싶다면 `npm run build:dev` 명령을 사용하면 됩니다.
4. 저장소의 `dist` 폴더로 가면 빌드된 `just-news.user.js` 파일을 확인할 수 있습니다.

#### 쉽게 개발버전 userscript를 테스트하는 법

Tampermonkey 등의 유저스크립트 플러그인을 사용하면
`*.user.js` 꼴의 주소로 들어갈 때 자동으로 재설치 화면을 띄워줍니다.

따라서 저장소 디렉토리에 http 서버를 띄워놓고, 소스코드 빌드 후
브라우저 탭을 열고 `http://localhost:<포트>/dist/just-news.user.js` 주소로 들어가면
방금 빌드한 `just-news`를 재설치하는 화면이 뜹니다.
`업그레이드` 또는 `재설치` 버튼을 눌러주면 됩니다.

http 서버는 다음과 같이 띄울 수 있습니다:
```sh
$ npx http-server -p <포트>
```

### 유의사항

#### 버그 제보 관련

* 특정 환경에서만 발생하는 버그는 제보시에 특정 환경(웹브라우저/OS 등)을 명시해주세요.
* 특정 뉴스사이트나 기사 페이지에서만 발생하는 버그 역시 제보시에 링크를 명시해주세요.

#### 개발 관련

* `article` 객체는 `src/index.ts`에 정의된 `Article` 인터페이스를 따르도록 합니다.
    * 뉴스 페이지에서 해당하는 정보가 없을 경우 `null`값을 채워 넣습니다.
* 릴리즈는 사람이 직접 할 필요가 없습니다. Travis CI를 통해 [jews-bot 계정](https://github.com/jews-bot)이 자동으로 처리합니다.

### 털어내기

몇몇 뉴스 사이트들은 사이트 재구성 뒤에도 광고가 남아있을 수 있습니다.
재구성을 했는데도 남는 광고들은 `cleanup` 함수를 사용하여 털어내도록 합시다.

예시)
```js
// 주의: iframe을 없애는게 대부분의 광고를 쉽게 없애버릴 수 있는 방법이긴 하지만
// 유투브 영상등을 포함한 뉴스기사의 경우, 단순히 iframe을 잡아서 날리면
// 실제 기사 내용이 사라지는 문제가 발생할 수 있습니다.
export const cleanup = () => $('#scrollDiv, iframe').remove();
```

`cleanup` 함수는 사이트 재구성이 일어난 뒤, 1초 주기로 매 번 호출됩니다.


## 지원 사이트

* [x] [ITWORLD](http://www.itworld.co.kr)
* [x] [JTBC](http://news.jtbc.joins.com)
* [x] [KBS](http://news.kbs.co.kr)
* [x] [KBS World](http://world.kbs.co.kr)
* [x] [MBC](http://imnews.imbc.com)
* [x] [MBN](http://mbn.mk.co.kr/pages/news/index.html)
* [x] [OSEN](http://osen.mt.co.kr)
* [x] [SBS](http://news.sbs.co.kr)
* [x] [YTN](http://www.ytn.co.kr)
* [x] [경향신문](http://www.khan.co.kr)
* [x] [국민일보](http://www.kmib.co.kr)
* [x] [나우뉴스](http://nownews.seoul.co.kr)
* [x] [네이버뉴스](http://news.naver.com)
* [ ] [네이트뉴스](http://news.nate.com)
* [x] [노컷뉴스](http://www.nocutnews.co.kr)
* [x] [뉴데일리](http://www.newdaily.co.kr)
* [x] [뉴데일리경제](http://biz.newdaily.co.kr)
* [x] [뉴스1](http://www.news1.kr)
* [x] [뉴시스](http://www.newsis.com)
* [ ] [다음뉴스](http://media.daum.net)
* [x] [데일리시큐](http://dailysecu.com)
* [x] [데일리안](http://www.dailian.co.kr)
* [x] [데일리한국](http://daily.hankooki.com)
* [x] [동아일보](http://www.donga.com)
* [x] [디스패치](http://www.dispatch.co.kr)
* [x] [디지털타임스](http://www.dt.co.kr)
* [x] [로이터](http://www.reuters.com)
* [x] [마이데일리](http://www.mydaily.co.kr)
* [x] [매일경제](http://www.mk.co.kr)
* [x] [머니투데이](http://www.mt.co.kr)
* [x] [문화일보](http://www.munhwa.com)
* [x] [미디어스](http://www.mediaus.co.kr)
* [x] [미디어오늘](http://www.mediatoday.co.kr)
* [x] [민중의소리](http://www.vop.co.kr)
* [x] [뷰스앤뉴스](http://www.viewsnnews.com)
* [x] [블로터닷넷](http://www.bloter.net)
* [x] [서울경제](http://economy.hankooki.com)
* [x] [서울신문](http://www.seoul.co.kr)
* [x] [세계일보](http://www.segye.com)
* [x] [스포츠경향](http://sports.khan.co.kr)
* [x] [스포츠동아](http://sports.donga.com)
* [x] [스포츠서울](http://www.sportsseoul.com)
* [x] [스포츠조선](http://sports.chosun.com)
* [x] [스포탈코리아](http://www.sportalkorea.com)
* [x] [슬로우뉴스](http://slownews.kr)
* [x] [시사IN Live](http://www.sisainlive.com)
* [x] [아시아경제](http://www.asiae.co.kr)
* [x] [아시아투데이](http://www.asiatoday.co.kr)
* [x] [아이뉴스24](http://www.inews24.com)
* [x] [여성뉴스](http://www.womennews.co.kr)
* [x] [연합뉴스](http://www.yonhapnews.co.kr)
* [x] [오마이뉴스](http://www.ohmynews.com)
* [x] [월스트리트저널](http://kr.wsj.com)
* [x] [이데일리](http://www.edaily.co.kr)
* [x] [일간스포츠](http://isplus.joins.com)
* [x] [전자신문](http://www.etnews.com)
* [x] [조선비즈](http://biz.chosun.com)
* [x] [조선일보](http://www.chosun.com)
* [x] [중앙데일리](http://koreajoongangdaily.joins.com)
* [x] [중앙일보](http://joongang.joins.com)
* [x] [지디넷코리아](http://www.zdnet.co.kr)
* [x] [지지통신](http://www.jiji.com)
* [x] [코리아타임스](http://www.koreatimes.co.kr)
* [x] [코리아헤럴드](http://www.koreaherald.com)
* [x] [파이낸셜뉴스](http://www.fnnews.com)
* [x] [프레시안](http://www.pressian.com)
* [x] [한겨레](http://www.hani.co.kr)
* [x] [한국경제](http://www.hankyung.com)
* [x] [한국경제TV](http://www.wowtv.co.kr)
* [x] [한국일보](http://www.hankookilbo.com)
* [x] [허핑턴포스트](http://www.huffingtonpost.kr)
* [x] [헤럴드경제](http://biz.heraldcorp.com)
