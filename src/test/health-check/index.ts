import fs from 'fs';
import puppeteer from 'puppeteer';

import {
    wait,
} from '../../util';
import {
    getImpl,
    fromJSON,
} from '../..';
import imageReporter from './reporter/image';
import markdownReporter from './reporter/markdown';


interface Case {
    impl: string;
    url: string;
    check: string[];
    related: string[];
}

interface JobError {
    type: 'error';
    impl: string;
    error: Error;
}
interface JobOk extends UnwrapPromise<ReturnType<typeof doJob>> {
    type: 'ok';
}
export type JobResult = (JobError | JobOk) & { duration: number };

// `impl` 기준 사전순으로 정렬할 것
const cases: Case[] = [
    {
        impl: '경향신문',
        url: 'http://biz.khan.co.kr/khan_art_view.html?artid=201410311921301&code=920100&med=khan',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name', 'reporters.0.mail'],
        related: ['#58'],
    },
    {
        impl: '국민일보',
        url: 'http://news.kmib.co.kr/article/view.asp?arcid=0008864720&code=61121111',
        check: ['title', 'content', 'timestamp.created'],
        related: ['#77'],
    },
    // TODO: 나우뉴스
    // TODO: 네이버뉴스
    // TODO: 노컷뉴스
    // TODO: 뉴데일리
    // TODO: 뉴데일리경제
    // TODO: 뉴스1
    // TODO: 뉴시스
    // TODO: 다음뉴스
    // TODO: 데일리시큐
    // TODO: 데일리안
    {
        impl: '데일리한국',
        url: 'http://daily.hankooki.com/lpage/politics/201412/dh20141219103740137430.htm',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name', 'reporters.0.mail'],
        related: ['#91'],
    },
    {
        impl: '동아일보',
        url: 'http://news.donga.com/3/03/20141107/67723014/1',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: ['#65'],
    },
    // TODO: 디스패치
    // TODO: 디지털데일리
    // TODO: 디지털타임스
    // TODO: 로이터
    // TODO: 마이데일리
    // TODO: 마이경제
    // TODO: 머니투데이
    // TODO: 문화일보
    // TODO: 미디어스
    // TODO: 미디어오늘
    // TODO: 민중의소리
    // TODO: 뷰스앤뉴스
    // TODO: 블로터닷넷
    // TODO: 서울경제
    {
        impl: '서울신문',
        url: 'http://seoul.co.kr/news/newsView.php?id=20141204500025',
        check: ['title', 'subtitle', 'content', 'timestamp.lastModified'],
        related: ['#83'],
    },
    // TODO: 세계일보
    // TODO: 스포츠경향
    // TODO: 스포츠동아
    // TODO: 스포츠서울
    // TODO: 스포츠조선
    // TODO: 스포탈코리아
    // TODO: 슬로우뉴스
    // TODO: 시사IN Live
    // TODO: 아시아경제
    // TODO: 아시아투데이
    {
        impl: '아이뉴스24',
        url: 'http://www.inews24.com/view/860573',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: ['#61'],
    },
    // TODO: 여성뉴스
    // TODO: 연합뉴스
    // TODO: 오마이뉴스
    {
        impl: '월스트리트저널',
        url: 'https://realtime.wsj.com/korea/2014/10/13/%EB%B0%95%EC%9B%90%EC%88%9C-%EC%84%9C%EC%9A%B8%EC%8B%9C%EC%9E%A5-%EB%AF%B8%EA%B5%AD-%EC%96%B8%EB%A1%A0%EC%97%90-%EB%8F%99%EC%84%B1%EA%B2%B0%ED%98%BC-%EC%A7%80%EC%A7%80-%EB%B0%9C%EC%96%B8/',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: ['#84'],
    },
    // TODO: 이데일리
    // TODO: 일간스포츠
    {
        impl: '전자신문',
        url: 'http://www.etnews.com/20191031000370?mc=ns_003_00006',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name', 'reporters.0.mail'],
        related: [],
    },
    // TODO: 조선비즈
    // TODO: 조선일보
    // TODO: 중앙데일리
    {
        impl: '중앙일보',
        url: 'https://news.joins.com/article/23621286',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '지디넷코리아',
        url: 'http://www.zdnet.co.kr/view/?no=20141104074223',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name'],
        related: ['#69'],
    },
    // TODO: 지지통신
    // TODO: 코리아타임스
    {
        impl: '코리아헤럴드',
        url: 'http://khnews.kheraldm.com/view.php?ud=20141111001137&md=20141111180830_BK&kr=1',
        check: [
            'title',
            'content',
            'timestamp.created',
            'timestamp.lastModified',
            'reporters.0.name',
            'reporters.0.mail',
        ],
        related: ['#71'],
    },
    // TODO: 파이낸셜뉴스
    // TODO: 프레시안
    // TODO: 한겨레
    // TODO: 한국경제
    // TODO: 한국경제증권
    // TODO: 한국경제TV
    // TODO: 한국일보
    {
        impl: '허핑턴포스트',
        url: 'https://www.huffingtonpost.kr/entry/story_kr_5d36a558e4b004b6adb5029c?9e4',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified', ],
        related: ['#358'],
    },
    {
        impl: '헤럴드경제',
        url: 'http://news.heraldcorp.com/view.php?ud=20141023000202&md=20141023091209_BK',
        check: ['title', 'content', 'timestamp.created'],
        related: ['#56'],
    },
    // TODO: ITWORLD
    {
        impl: 'JTBC',
        url: 'http://news.jtbc.joins.com/article/article.aspx?news_id=NB10639468',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: ['#70'],
    },
    {
        impl: 'JTBC-모바일',
        url: 'http://mnews.jtbc.joins.com/News/Article.aspx?news_id=NB11866214',
        check: ['title', 'content'],
        related: [],
    },
    // TODO: KBS World
    // TODO: KBS
    // TODO: MBC
    // TODO: MBN
    // TODO: OSEN
    {
        impl: 'SBS',
        url: 'https://news.sbs.co.kr/news/endPage.do?news_id=N1002697236',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: ['#80'],
    },
    {
        impl: 'YTN',
        url: 'https://www.ytn.co.kr/_ln/0103_201411190800481989',
        check: ['title', 'content', 'timestamp.created'],
        related: ['#76'],
    },
];

async function run() {
    const jobs = [...cases];
    const jobResults: JobResult[] = [];
    /*
    const headless = false;
    const workers = [0, 1];
    /*/
    const headless = true;
    const workers = [0, 1, 2, 3, 4, 5, 6, 7];
    //*/
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: 'google-chrome-unstable',
        headless,
    });
    await Promise.all(workers.map(async () => {
        let job: Case;
        while (job = jobs.pop()!) {
            console.log(
                `${ jobs.length + 1 } / ${ cases.length } - ` +
                `${ job.impl }${
                    job.related.length ? `(${ job.related.join(', ') })` : ''
                } 처리중...`
            );
            const page = await browser.newPage();
            const startTime = Date.now();
            const jobResult = await doJob(job, page).then(
                result => ({ type: 'ok' as const, ...result }),
            ).catch(
                error => ({ type: 'error' as const, impl: job.impl, error }),
            );
            const duration = Date.now() - startTime;
            jobResults.push({ ...jobResult, duration });
            await page.close();
        }
    }));
    await imageReporter(jobResults, browser);
    const markdownReport = await markdownReporter(jobResults, browser);
    await browser.close();
    fs.writeFileSync(
        './tmp/health-check.json',
        JSON.stringify(jobResults, null, 4),
    );
    fs.writeFileSync('./tmp/health-check.md', markdownReport);
}
run().catch(e => {
    console.error(e ? (e.stack || e) : e);
    process.exit(1);
});

async function doJob(job: Case, page: puppeteer.Page) {
    const impl = getImpl(job.impl);
    const waitForSelector = async (selector: string) => void await Promise.race([
        page.waitForSelector(selector, { timeout: 0 } ),
        wait(3000),
    ]);
    await Promise.race([
        page.goto(job.url, { timeout: 0 }),
        ...(impl.readyToParse ? [impl.readyToParse(waitForSelector)] : [] as any),
        wait(3000),
    ]);
    const article = fromJSON(await page.evaluate(doJob.browserScript));
    type ProblemReason = 'missing' | 'invalid';
    type Problem = [string/* path */, ProblemReason];
    interface JobOkResult extends Case {
        article: typeof article;
        problems: Problem[];
    }
    if (!article) return { ...job, article, problems: [] } as JobOkResult;
    return {
        ...job,
        article,
        problems: job.check.map(path => {
            const value = pincet(article, path);
            if (!value) return [path, 'missing'] as const;
            if (path.startsWith('timestamp.')) {
                if (isNaN(+value)) return [path, 'invalid'] as const;
            }
            return null;
        }).filter(x => x),
    } as JobOkResult;
}
doJob.browserScript = `
    new Promise(async resolve => {
        const article = ${ fs.readFileSync('./tmp/health-check.js', 'utf8') };
        resolve(await article.default);
    })
`;

function pincet(obj: any, path: string): any {
    let result = obj;
    for (const fieldName of path.split('.')) {
        if (!result) return undefined;
        if (typeof result !== 'object') return undefined;
        if (!(fieldName in result)) return undefined;
        result = result[fieldName];
    }
    return result;
}
