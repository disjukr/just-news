# jews

뉴스 사이트 기사 페이지에 접속하면 뉴스 본문외의 정보를 전부 제거한 뒤 페이지를 재구성하는 스크립트입니다.


## 사용하기

* 파이어폭스 사용자: [Greasemonkey](https://addons.mozilla.org/ko/firefox/addon/greasemonkey/) 플러그인을 설치합니다.
* 크롬 사용자: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 플러그인을 설치합니다.
* 사파리 사용자: [NinjaKit](https://github.com/os0x/NinjaKit) 플러그인을 설치합니다.
* IE 사용자: [TrixIE](http://sourceforge.net/projects/trixiewpf45/) 플러그인을 설치합니다.

[스크립트 설치](https://raw.githubusercontent.com/disjukr/jews/master/jews.js)


## 기여하는 법

1. 구현하고 싶은 뉴스 사이트를 정합니다.
    1. 뉴스 사이트가 하단의 todo 목록에 체크되어있지 않은지 확인합니다.
    2. 목록에 사이트가 없으면 추가합니다.
2. jews.js에 구현합니다.
    1. 상단의 UserScript 주석에 뉴스 페이지 주소를 추가합니다.
    2. `where` 변수에 뉴스사를 구분할 수 있는 문자열을 대입합니다.
    3. `jews.title`, `jews.content`, `jews.timestamp`, `jews.reporters`를 각각 구현합니다.
3. todo 목록에 구현한 항목을 체크하고 Pull Request를 보냅니다.

### 유의사항

* todo 목록은 알파벳, 가나다순 정렬을 유지하도록 합니다.
* `jews` 객체 구현 시에 아래에 정의된 타입을 따르도록 합니다.
* 뉴스 페이지에서 해당하는 정보가 없을 경우 `undefined`값을 채워 넣습니다.
* `jQuery`등의 라이브러리는 해당 뉴스 페이지에서 제공하는 경우에만 사용합니다.

### `jews` 타입

```
jews.title: string
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
```


## todo

* [x] [KBS](http://news.kbs.co.kr)
* [x] [KBS World](http://world.kbs.co.kr)
* [x] [MBC](http://imnews.imbc.com)
* [x] [MBN](http://mbn.mk.co.kr)
* [x] [OSEN](http://osen.mt.co.kr)
* [x] [SBS](http://news.sbs.co.kr)
* [ ] [YTN](http://www.ytn.co.kr)
* [x] [경향신문](http://www.khan.co.kr)
* [ ] [국민일보](http://www.kmib.co.kr)
* [ ] [노컷뉴스](http://www.nocutnews.co.kr)
* [ ] [뉴데일리](http://www.newdaily.co.kr)
* [ ] [뉴시스](http://www.newsis.com)
* [ ] [데일리안](http://www.dailian.co.kr)
* [ ] [동아일보](http://www.donga.com)
* [ ] [디지털타임스](http://www.dt.co.kr)
* [ ] [로이터](http://www.reuters.com)
* [ ] [마이데일리](http://www.mydaily.co.kr)
* [ ] [매일경제](http://www.mk.co.kr)
* [ ] [머니투데이](http://www.mt.co.kr)
* [ ] [문화일보](http://www.munhwa.com)
* [x] [미디어오늘](http://www.mediatoday.co.kr)
* [ ] [블로터닷넷](http://www.bloter.net)
* [ ] [서울경제](http://economy.hankooki.com)
* [ ] [서울신문](http://www.seoul.co.kr)
* [ ] [세계일보](http://www.segye.com)
* [ ] [스포츠동아](http://sports.donga.com)
* [ ] [스포츠조선](http://sports.chosun.com)
* [ ] [스포탈코리아](http://www.sportalkorea.com)
* [ ] [아시아경제](http://www.asiae.co.kr)
* [ ] [아이뉴스24](http://www.inews24.com)
* [ ] [오마이뉴스](http://www.ohmynews.com)
* [x] [월스트리트저널](http://kr.wsj.com)
* [ ] [이데일리](http://www.edaily.co.kr)
* [ ] [일간스포츠](http://isplus.joins.com)
* [ ] [전자신문](http://www.etnews.com)
* [x] [조선비즈](http://biz.chosun.com)
* [ ] [조선일보](http://www.chosun.com)
* [ ] [중앙데일리](http://koreajoongangdaily.joins.com)
* [ ] [중앙일보](http://joongang.joins.com)
* [x] [지디넷코리아](http://www.zdnet.co.kr)
* [ ] [지지통신](http://www.jiji.com)
* [ ] [코리아타임스](http://www.koreatimes.co.kr)
* [ ] [코리아헤럴드](http://www.koreaherald.com)
* [ ] [파이낸셜뉴스](http://www.fnnews.com)
* [ ] [프레시안](http://www.pressian.com)
* [ ] [한겨레](http://www.hani.co.kr)
* [ ] [한국경제](http://www.hankyung.com)
* [ ] [한국경제TV](http://www.wownet.co.kr)
* [ ] [한국일보](http://www.hankookilbo.com)
* [ ] [헤럴드경제](http://biz.heraldcorp.com)
