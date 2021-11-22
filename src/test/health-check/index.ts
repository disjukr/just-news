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
    {
        impl: '나우뉴스',
        url: 'https://nownews.seoul.co.kr/news/newsView.php?id=20211117601017',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: '네이버뉴스',
        url: 'https://news.naver.com/main/read.naver?mode=LSD&mid=shm&sid1=101&oid=018&aid=0005090507',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '노컷뉴스',
        url: 'https://www.nocutnews.co.kr/news/5660721',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '뉴데일리',
        url: 'https://www.newdaily.co.kr/site/data/html/2021/11/21/2021112100021.html',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '뉴데일리경제',
        url: 'https://biz.newdaily.co.kr/site/data/html/2021/11/21/2021112100032.html',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '뉴스1',
        url: 'https://www.news1.kr/articles/?4500076',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '뉴시스',
        url: 'https://www.newsis.com/view/?id=NISX20211122_0001659601',
        check: ['title', 'subtitle', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '다음뉴스',
        url: 'https://news.v.daum.net/v/20211122113443656',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '데일리시큐',
        url: 'https://dailysecu.com/news/articleView.html?idxno=131823',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '데일리안',
        url: 'https://dailian.co.kr/news/view/1055238/',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name'],
        related: [],
    },
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
    {
        impl: '디스패치',
        url: 'https://www.dispatch.co.kr/2174673',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: '디지털데일리',
        url: 'https://www.ddaily.co.kr/news/article/?no=225942',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '디지털타임스',
        url: 'https://www.ddaily.co.kr/news/article/?no=225942',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '로이터',
        url: 'https://www.reuters.com/world/americas/two-hostages-have-been-released-haiti-group-says-2021-11-21/',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '마이데일리',
        url: 'http://mydaily.co.kr/new_yk/html/read.php?newsid=202111212349123985',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '매일경제',
        url: 'https://www.mk.co.kr/news/business/view/2021/11/1086965/',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '머니투데이',
        url: 'https://news.mt.co.kr/mtview.php?no=2021112211020172624&MT_T',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '문화일보',
        url: 'http://www.munhwa.com/news/view.html?no=2021112201031512069001',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '미디어스',
        url: 'http://www.munhwa.com/news/view.html?no=2021112201031512069001',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '미디어오늘',
        url: 'http://www.mediatoday.co.kr/news/articleView.html?idxno=300761',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '민중의소리',
        url: 'https://www.vop.co.kr/A00001603217.html',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '뷰스앤뉴스',
        url: 'https://www.vop.co.kr/A00001603217.html',
        check: ['title', 'subtitle', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '블로터닷넷',
        url: 'https://www.bloter.net/newsView/blt202111220006',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '서울경제',
        url: 'https://m.sedaily.com/NewsView/22U46M3IIJ#cb',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: '서울신문',
        url: 'http://seoul.co.kr/news/newsView.php?id=20141204500025',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: ['#83'],
    },
    {
        impl: '세계일보',
        url: 'https://www.segye.com/newsView/20211119507307',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: '스포츠경향',
        url: 'https://sports.khan.co.kr/entertainment/sk_index.html?art_id=202111211711013&sec_id=540201',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '스포츠동아',
        url: 'https://sports.donga.com/home/article/all/20211115/110248179/1',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '스포츠서울',
        url: 'http://www.sportsseoul.com/news/read/1078489',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: '스포츠조선',
        url: 'https://sports.chosun.com/news/utype.htm?id=202111220100167160011093&ServiceDate=20211122',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '스포탈코리아',
        url: 'https://www.sportalkorea.com/news/view.php?gisa_uniq=2021112115374713&section_code=20&newsstand=1',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '슬로우뉴스',
        url: 'https://slownews.kr/82712',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '시사IN Live',
        url: 'https://www.sisain.co.kr/news/articleView.html?idxno=46076',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '아시아경제',
        url: 'https://www.asiae.co.kr/article/2021112209350950847',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: '아시아투데이',
        url: 'https://www.asiatoday.co.kr/view.php?key=20211122010012773',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '아이뉴스24',
        url: 'http://www.inews24.com/view/860573',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: ['#61'],
    },
    {
        impl: '여성뉴스',
        url: 'http://www.womennews.co.kr/news/articleView.html?idxno=217816',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '연합뉴스',
        url: 'https://www.yna.co.kr/view/AKR20211122074000002?section=economy/all',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '오마이뉴스',
        url: 'http://star.ohmynews.com/NWS_Web/OhmyStar/at_pg.aspx?CNTN_CD=A0002788924&PAGE_CD=N0002&CMPT_CD=M0113',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '월스트리트저널',
        url: 'https://realtime.wsj.com/korea/2014/10/13/%EB%B0%95%EC%9B%90%EC%88%9C-%EC%84%9C%EC%9A%B8%EC%8B%9C%EC%9E%A5-%EB%AF%B8%EA%B5%AD-%EC%96%B8%EB%A1%A0%EC%97%90-%EB%8F%99%EC%84%B1%EA%B2%B0%ED%98%BC-%EC%A7%80%EC%A7%80-%EB%B0%9C%EC%96%B8/',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: ['#84'],
    },
    {
        impl: '이데일리',
        url: 'https://m.edaily.co.kr/news/read?newsId=01744966629248344&mediaCodeNo=257',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '일간스포츠',
        url: 'http://isplus.live.joins.com/news/article/article.asp?total_id=24169898&cloc=isplus|home|isplus_top',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '전자신문',
        url: 'http://www.etnews.com/20191031000370?mc=ns_003_00006',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name', 'reporters.0.mail'],
        related: [],
    },
    {
        impl: '조선비즈',
        url: 'https://biz.chosun.com/real_estate/real_estate_general/2021/11/22/ZSIJL2ORERBX3GV2QNFHKG4554/',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '조선일보',
        url: 'https://www.chosun.com/economy/science/2021/11/22/EK6YVU4KE5FZ7OWAJ4YDFKHDAY/',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '중앙데일리',
        url: 'https://koreajoongangdaily.joins.com/2021/11/21/national/socialAffairs/Covid19-coronavirus-daily-cases/20211121163258228.html',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
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
    {
        impl: '지지통신',
        url: 'https://www.jiji.com/jc/article?k=2021112100232&g=pol',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '코리아타임스',
        url: 'https://www.koreatimes.co.kr/www/biz/2021/11/175_319182.html',
        check: ['title', 'content', 'reporters.0.name'],
        related: [],
    },
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
    {
        impl: '파이낸셜뉴스',
        url: 'https://www.fnnews.com/news/202111220952112689',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: '프레시안',
        url: 'https://www.pressian.com/pages/articles/2021112210331175304#0DKU',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '한겨레',
        url: 'https://www.hani.co.kr/arti/society/society_general/1020220.html?_fr=mt1',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '한국경제',
        url: 'https://www.hankyung.com/finance/article/2021112244686?just_news=false',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name'],
        related: [],
    },
    {
        impl: '한국경제증권',
        url: 'https://www.hankyung.com/finance/article/2021112242925',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: '한국경제TV',
        url: 'https://www.wowtv.co.kr/NewsCenter/News/Read?menuSeq=459&subMenu=latest&wowcode=&Class=&articleId=AKR20211121059651003',
        check: ['title', 'content', 'timestamp.created'],
        related: [],
    },
    {
        impl: '한국일보',
        url: 'https://www.wowtv.co.kr/NewsCenter/News/Read?menuSeq=459&subMenu=latest&wowcode=&Class=&articleId=AKR20211121059651003',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
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
    {
        impl: 'ITWORLD',
        url: 'https://www.itworld.co.kr/news/215664',
        check: ['title', 'content', 'timestamp.created', 'reporters.0.name'],
        related: [],
    },
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
    {
        impl: 'KBS World',
        url: 'http://mnews.jtbc.joins.com/News/Article.aspx?news_id=NB11866214',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: 'KBS',
        url: 'https://news.kbs.co.kr/news/view.do?ncd=5330684',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: 'MBC',
        url: 'https://imnews.imbc.com/replay/2021/nwtoday/article/6316313_34943.html',
        check: ['title', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: 'MBN',
        url: 'https://www.mbn.co.kr/news/life/4643606',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: [],
    },
    {
        impl: 'OSEN',
        url: 'http://osen.mt.co.kr/article/G1111697930',
        check: ['title', 'content'],
        related: [],
    },
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
