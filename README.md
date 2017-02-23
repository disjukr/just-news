# jews

[![travis](https://travis-ci.org/disjukr/jews.svg)](https://travis-ci.org/disjukr/jews)

뉴스 사이트 기사 페이지에 접속하면 뉴스 본문외의 정보를 전부 제거한 뒤 페이지를 재구성하는 스크립트입니다.

프로젝트를 만든 사람이 구글 크롬 브라우저를 사용하기 때문에 크롬을 최우선으로 지원합니다.

릴리즈 기준은 크롬 브라우저에서 전부 잘 동작하는가이므로 업데이트가 있을 경우 크롬 외 브라우저에서는 잘 동작하지 않을 수 있습니다.


## 설치하기

jews는 뉴스 기사 페이지에서 작동되는 스크립트이며, 자동으로 실행되기 위해서는 UserScript 플러그인의 도움이 필요합니다.

### UserScript 플러그인 설치

필요한 UserScript 플러그인은 사용중인 브라우저마다 다르며, 각각의 플러그인은 다음의 링크로 들어가 설치하실 수 있습니다:

* [파이어폭스 사용자 - Greasemonkey](https://addons.mozilla.org/ko/firefox/addon/greasemonkey/)
* [크롬 사용자 - Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* [사파리 사용자 - NinjaKit](https://github.com/os0x/NinjaKit)
* [IE 사용자 - TrixIE](http://sourceforge.net/projects/trixiewpf45/)

### [스크립트 설치](https://github.com/disjukr/jews/raw/release/dist/jews.user.js)

UserScript 플러그인이 설치됐다면 위 링크를 클릭하여 스크립트 설치 다이얼로그를 띄웁니다.

### 최상위 경로의 `jews.user.js`에 대해서...

배포전용 파일은 `dist/jews.user.js`로 대체되었지만,
유저스크립트 플러그인의 스크립트 자동 업데이트 등을 위해
당분간 저장소 최상위 경로에 `jews.user.js` 파일은 남겨놓도록 하겠습니다.
한 번 업데이트 되고나면 그 이후로는 `dist/jews.user.js`로 업데이트될 것입니다.

## 기여하는 법

### 버그 제보하기

jews는 github issue tracker를 사용합니다.
이슈는 https://github.com/disjukr/jews/issues 로 제보해주시기 바랍니다.

### 소스코드로 기여하기

1. 구현하고 싶은 뉴스 사이트를 정합니다.
    1. 뉴스 사이트가 하단의 지원 사이트 목록에 체크되어있지 않은지 확인합니다.
    2. 목록에 사이트가 없으면 추가합니다.
2. 구현합니다.
    1. `src/sites.js`에 뉴스사 이름을 키로 갖는, 주소 패턴 목록을 추가합니다.
    2. `src/impl` 경로에 `jews` 객체를 반환하는 모듈을 작성합니다.
        1. 모듈 이름은 뉴스사 이름으로 합니다.
        2. 비동기로 작동해야할 경우 `Promise` 객체를 반환하면 됩니다.
3. 지원 사이트 목록에 구현한 항목을 체크하고 Pull Request를 보냅니다.

### 소스코드 빌드하기

이 프로젝트는 [webpack](http://webpack.github.io/)을 사용하여 `jews.user.js` 파일을 빌드합니다.
웹팩을 사용해서 빌드를 하기 위해 다음의 절차를 따라야 합니다:

1. [nodejs](https://nodejs.org/)를 설치합니다.
2. jews가 사용하는 라이브러리들을 설치합니다.
    1. jews 저장소 폴더에서 다음의 명령을 실행합니다: `yarn`
    2. `yarn`이 작동하지 않으면 다음의 명령으로 `yarn`을 설치한 후 다시 시도합니다: `npm install -g yarn`
3. 다음 중 하나의 명령을 사용해서 빌드를 수행합니다:
    * 테스트용 빌드: `npm run build`
    * 지속적인 테스트용 빌드: `npm run watch`
    * 릴리즈용 빌드: `npm run production`
4. 저장소의 `dist` 폴더로 가면 빌드된 `jews.user.js` 파일을 확인할 수 있습니다.

### 유의사항

#### 버그 제보 관련
* 특정 환경에서만 발생하는 버그는 제보시에 특정 환경(브라우저/OS 등)을 명시해주세요.
* 특정 뉴스사이트나 기사 페이지에서만 발생하는 버그 역시 제보시에 링크를 명시해주세요.

#### 개발 관련
* `jews` 객체 반환 시에 아래에 정의된 타입을 따르도록 합니다.
* 뉴스 페이지에서 해당하는 정보가 없을 경우 `undefined`값을 채워 넣습니다.
* 릴리즈는 사람이 직접 할 필요가 없습니다. travis ci를 통해 [jews-bot 계정](https://github.com/jews-bot)이 자동으로 처리합니다.

### `jews` 타입 정의

아래 타입 정의 스키마는 [makise](https://github.com/disjukr/makise)의 문법을 따릅니다.
```makise
this is jews

jews is {
    title: string,
    subtitle: string,
    content: html_fragment,
    timestamp: {
        created: Date,
        lastModified: Date
    },
    reporters: [reporter, ...],
    cleanup: Function
}

reporter is {
    name: string,
    mail: mail_address
}

html_fragment is string
mail_address is string
```

### 털어내기

몇몇 뉴스 사이트들은 사이트 재구성 뒤에도 광고가 남아있을 수 있습니다.
재구성을 했는데도 남는 광고들은 `jews.cleanup`를 사용하여 털어내도록 합시다.

`jews.cleanup` 함수는 사이트 재구성이 일어난 뒤, 1초 주기로 매 번 호출됩니다.


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
* [x] [경향비즈](http://bizn.khan.co.kr)
* [x] [경향신문](http://www.khan.co.kr)
* [x] [국민일보](http://www.kmib.co.kr)
* [x] [나우뉴스](http://nownews.seoul.co.kr)
* [ ] [네이버뉴스](http://news.naver.com)
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
