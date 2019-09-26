import { Reporter } from '.';
import htmlReporter from './html';

const imageReporter: Reporter<void> = async (jobResults, browser) => {
    const htmlReport = await htmlReporter(jobResults, browser);
    const page = await browser.newPage();
    await page.setContent(htmlReport);
    await page.waitFor('main');
    const mainTag = await page.$('main') || page;
    await mainTag.screenshot({
        path: './tmp/health-check.png',
    });
}

export default imageReporter;
