# jews

뉴스 사이트 기사 페이지에 접속하면 뉴스 본문외의 정보를 전부 제거한 뒤 페이지를 재구성하는 스크립트입니다.


## 설치하기

jews는 뉴스 기사 페이지에서 작동되는 스크립트이며, 자동으로 실행되기 위해서는 UserScript 플러그인의 도움이 필요합니다.

필요한 UserScript 플러그인은 사용중인 브라우저마다 다르며, 각각의 플러그인은 다음의 링크로 들어가 설치하실 수 있습니다:

* [파이어폭스 사용자 - Greasemonkey](https://addons.mozilla.org/ko/firefox/addon/greasemonkey/)
* [크롬 사용자 - Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* [사파리 사용자 - NinjaKit](https://github.com/os0x/NinjaKit)
* [IE 사용자 - TrixIE](http://sourceforge.net/projects/trixiewpf45/)

UserScript 플러그인이 설치됐다면 다음의 링크를 클릭하여 스크립트 설치 다이얼로그를 띄웁니다:

**[>>>>> 스크립트 설치 <<<<<](https://github.com/disjukr/jews/raw/release/jews.user.js)**


## 기여하는 법

1. 구현하고 싶은 뉴스 사이트를 정합니다.
    1. 뉴스 사이트가 하단의 지원 사이트 목록에 체크되어있지 않은지 확인합니다.
    2. 목록에 사이트가 없으면 추가합니다.
2. jews.user.js에 구현합니다.
    1. 상단의 UserScript 주석에 뉴스 페이지 주소를 추가합니다.
    2. `where` 함수에 뉴스사를 구분할 수 있는 문자열을 추가합니다.
    3. `jews.title`, `jews.subtitle`, `jews.content`, `jews.timestamp`, `jews.reporters`를 각각 구현합니다.
3. 지원 사이트 목록에 구현한 항목을 체크하고 Pull Request를 보냅니다.

### 유의사항

* 지원 사이트 목록은 알파벳, 가나다순 정렬을 유지하도록 합니다.
* `jews` 객체 구현 시에 아래에 정의된 타입을 따르도록 합니다.
* 뉴스 페이지에서 해당하는 정보가 없을 경우 `undefined`값을 채워 넣습니다.

### `jews` 타입

```
jews.title: string
jews.subtitle: string
jews.content: string // html fragment
jews.timestamp: {
    created: Date
    lastModified: Date
}
jews.reporters: reporter[]
reporter = {
    name: string
    mail: string // email address
}
pesticide: function
spraying_cycle: number
```

### 살충제 뿌리기

몇몇 뉴스 사이트들은 사이트 재구성 뒤에도 광고가 남아있을 수 있습니다.
재구성을 했는데도 남는 광고들은 `jews.pesticide`를 사용하여 방제하도록 합시다.

`jews.pesticide` 함수는 사이트 재구성이 일어난 뒤, 매 `jews.spraying_cycle`(밀리초 단위)마다 호출됩니다.
`jews.spraying_cycle`가 정의되어있지 않다면 1초 주기로 호출됩니다.


## 지원 사이트

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
* [x] [노컷뉴스](http://www.nocutnews.co.kr)
* [x] [뉴데일리](http://www.newdaily.co.kr)
* [x] [뉴데일리경제](http://biz.newdaily.co.kr)
* [x] [뉴시스](http://www.newsis.com)
* [x] [데일리시큐](http://dailysecu.com)
* [x] [데일리안](http://www.dailian.co.kr)
* [x] [동아일보](http://www.donga.com)
* [x] [디지털타임스](http://www.dt.co.kr)
* [x] [로이터](http://www.reuters.com)
* [x] [마이데일리](http://www.mydaily.co.kr)
* [x] [매일경제](http://www.mk.co.kr)
* [x] [머니투데이](http://www.mt.co.kr)
* [x] [문화일보](http://www.munhwa.com)
* [x] [미디어오늘](http://www.mediatoday.co.kr)
* [x] [블로터닷넷](http://www.bloter.net)
* [x] [서울경제](http://economy.hankooki.com)
* [x] [서울신문](http://www.seoul.co.kr)
* [x] [세계일보](http://www.segye.com)
* [x] [스포츠동아](http://sports.donga.com)
* [x] [스포츠조선](http://sports.chosun.com)
* [x] [스포탈코리아](http://www.sportalkorea.com)
* [x] [아시아경제](http://www.asiae.co.kr)
* [ ] [아시아투데이](http://www.asiatoday.co.kr)
* [x] [아이뉴스24](http://www.inews24.com)
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
