import fs from 'fs';
import puppeteer from 'puppeteer';

import {
    wait,
} from '../../util';
import {
    getImpl,
    fromJSON,
} from '../..';


interface Case {
    impl: string;
    url: string;
    check: string[];
    related: string[];
}

const cases: Case[] = [
    {
        impl: '경향신문',
        url: 'http://biz.khan.co.kr/khan_art_view.html?artid=201410311921301&code=920100&med=khan',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name', 'reporters.0.mail'],
        related: ['#58'],
    },
    {
        impl: '아이뉴스24',
        url: 'http://www.inews24.com/view/860573',
        check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified'],
        related: ['#61'],
    },
    {
        impl: '헤럴드경제',
        url: 'http://news.heraldcorp.com/view.php?ud=20141023000202&md=20141023091209_BK',
        check: ['title', 'content', 'timestamp.created'],
        related: ['#56'],
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
    type JobResult = (JobError | JobOk) & { duration: number };
    interface JobError {
        type: 'error';
        error: Error;
    }
    interface JobOk extends UnwrapPromise<ReturnType<typeof doJob>> {
        type: 'ok';
    }
    const browser = await puppeteer.launch({ headless });
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
                error => ({ type: 'error' as const, error }),
            );
            const duration = Date.now() - startTime;
            jobResults.push({ ...jobResult, duration });
            await page.close();
        }
    }));
    await browser.close();
    fs.writeFileSync(
        './tmp/health-check.json',
        JSON.stringify(jobResults, null, 4),
    );
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
        // article: typeof article;
        problems: Problem[];
    }
    if (!article) return { ...job, article, problems: [] } as JobOkResult;
    return {
        ...job,
        // article,
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
