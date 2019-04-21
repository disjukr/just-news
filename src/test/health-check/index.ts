import puppeteer from 'puppeteer';

import {
    wait,
} from '../../util';
import {
    getImpl,
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
    //*
    const headless = false;
    const workers = [0, 1];
    /*/
    const headless = true;
    const workers = [0, 1, 2, 3, 4, 5, 6, 7];
    //*/
    const browser = await puppeteer.launch({ headless });
    await Promise.all(workers.map(async () => {
        let job: Case;
        while (job = jobs.pop()!) {
            const impl = getImpl(job.impl);
            const page = await browser.newPage();
            const waitForSelector = async (selector: string) => void await Promise.race([
                page.waitForSelector(selector, { timeout: 0 } ),
                wait(3000),
            ]);
            await Promise.race([
                page.goto(job.url, { timeout: 0 }),
                ...(impl.readyToParse ? [impl.readyToParse(waitForSelector)] : [] as any),
                wait(3000),
            ]);
            // await page.evaluate((job: Case) => {
            //     alert(job.impl);
            // }, job as any);
            // TODO
            await page.close();
        }
    }));
    await browser.close();
}
run();
