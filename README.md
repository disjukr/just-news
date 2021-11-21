# just-news

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
    1. 목록에 사이트가 없으면 추가합니다.
1. 구현합니다.
    1. `src/sites.ts`에 뉴스사 이름을 키로 갖는, 주소 패턴 목록을 추가합니다.
    1. `src/impl` 경로에 `article` 객체를 반환하는 `parse` 함수를 담은 모듈을 작성합니다.
        1. 모듈 이름은 뉴스사 이름으로 합니다.
        1. 비동기로 작동해야할 경우 `Promise` 객체를 반환하면 됩니다.
        1. 특정 뉴스기사에서만 작동하는 코드의 경우 해당 뉴스기사 url을 주석으로 적어주세요.
1. 지원 사이트 목록에 구현한 항목을 체크하고 Pull Request를 보냅니다.

### 소스코드 빌드하기

이 프로젝트는 [webpack](https://webpack.js.org/)을 사용하여 `just-news.user.js` 파일을 빌드합니다.
빌드를 하기 위해 다음의 절차를 따라야 합니다.

1. [nodejs](https://nodejs.org/)를 설치합니다.
1. [pnpm](https://pnpm.io/installation)을 설치합니다.
1. `pnpm install` 명령을 실행합니다.
1. `pnpm build` 명령을 실행합니다.
    - `pnpm build` 명령은 minify된 결과물을 주기 때문에 처리가 너무 오래걸릴 수 있습니다.
      빠르게 개발용 빌드를 얻고 싶다면 `pnpm build:dev` 명령을 사용하면 됩니다.
1. 저장소의 `dist` 폴더로 가면 빌드된 `just-news.user.js` 파일을 확인할 수 있습니다.

#### 쉽게 개발버전 userscript를 테스트하는 법

Tampermonkey 등의 유저스크립트 플러그인을 사용하면
`*.user.js` 꼴의 주소로 들어갈 때 자동으로 재설치 화면을 띄워줍니다.

프로젝트를 빌드한 다음 `dist` 폴더의 번들 파일을 HTTP로 서빙해서
브라우저 탭을 열고 `http://localhost:<포트>/just-news.user.js` 주소로 들어가면
방금 빌드한 `just-news`를 재설치하는 화면이 뜹니다.
`업그레이드` 또는 `재설치` 버튼을 눌러주면 됩니다.

개발용 서버는 다음과 같이 띄울 수 있습니다:

```sh
$ npm run dev
```

### 유의사항

#### 버그 제보 관련

* 특정 환경에서만 발생하는 버그는 제보시에 특정 환경(웹브라우저/OS 등)을 명시해주세요.
* 특정 뉴스사이트나 기사 페이지에서만 발생하는 버그 역시 제보시에 링크를 명시해주세요.

#### 개발 관련

* `article` 객체는 `src/index.ts`에 정의된 `Article` 인터페이스를 따르도록 합니다.
    * 뉴스 페이지에서 해당하는 정보가 없을 경우 `null`값을 채워 넣습니다.
* 릴리즈는 사람이 직접 할 필요가 없습니다. GitHub Actions를 통해 `just-news-bot`이 자동으로 처리합니다.

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

### 가속하기

just-news는 기사 본문이 언제 전부 로드되었는지를 특정할 수 없으면 웹페이지가 전부 로드될 때까지 기다립니다.
로드할 필요가 없는 광고 등이 전부 로드될 때까지 기다린다면 때로는 사용자가 이미 뉴스를 절반정도나 읽은 다음에
사이트 재구성이 이뤄지곤 합니다.

이를 피하기 위해 `readyToParse` 함수를 구현하여 just-news에게 사이트 재구성을 시작할 시점을 알려줄 수 있습니다.

예시)
```js
// 예를 들어 기사 본문이 있는 `#article` 엘리먼트 다음에
// 댓글이 들어있는 `#comments` 엘리먼트가 있다고 칩시다.
// `#comments`엘리먼트가 나타났다는 것은 기사 본문은 이미 로드돼있다고
// 가정할 수 있기 때문에 바로 파싱을 시작하면 됩니다.
export const readyToParse = () => waitElement('#comments');
```


## 지원 현황

[![health-check](https://user-images.githubusercontent.com/84654372/142752717-111ccd65-7d62-4247-8189-9167b058fad8.JPG)](https://github.com/disjukr/just-news/blob/health-check/health-check.md)
