# jews

뉴스 사이트 기사 페이지에 접속하면 뉴스 본문외의 정보를 전부 제거한 뒤 페이지를 재구성하는 스크립트입니다.


## 사용하기

* 파이어폭스 사용자: [Greasemonkey](https://addons.mozilla.org/ko/firefox/addon/greasemonkey/) 플러그인을 설치합니다.
* 크롬 사용자: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 플러그인을 설치합니다.
* 사파리 사용자: [NinjaKit](https://github.com/os0x/NinjaKit) 플러그인을 설치합니다.

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

* [x] KBS
* [x] KBS World
* [x] MBC
* [x] MBN
* [x] OSEN
* [ ] SBS
* [ ] YTN
* [x] 경향신문
* [ ] 국민일보
* [ ] 노컷뉴스
* [ ] 뉴데일리
* [ ] 뉴시스
* [ ] 데일리안
* [ ] 동아일보
* [ ] 디지털타임스
* [ ] 로이터
* [ ] 마이데일리
* [ ] 매일경제
* [ ] 머니투데이
* [x] 미디어오늘
* [ ] 블로터닷넷
* [ ] 서울경제
* [ ] 서울신문
* [ ] 석간 문화일보
* [ ] 세계일보
* [ ] 스포츠동아
* [ ] 스포츠조선
* [ ] 스포탈코리아
* [ ] 아시아경제
* [ ] 아이뉴스24
* [ ] 오마이뉴스
* [x] 월스트리트저널
* [ ] 이데일리
* [ ] 일간스포츠
* [ ] 전자신문
* [x] 조선비즈
* [ ] 조선일보
* [ ] 중앙데일리
* [ ] 중앙일보
* [x] 지디넷코리아
* [ ] 지지통신
* [ ] 코리아타임스
* [ ] 코리아헤럴드
* [ ] 파이낸셜뉴스
* [ ] 프레시안
* [ ] 한겨레
* [ ] 한국경제
* [ ] 한국경제TV
* [ ] 한국일보
* [ ] 헤럴드경제
