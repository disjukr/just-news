import { Reporter } from '.';
import htmlReporter from './html';

const imageReporter: Reporter<void> = async (jobResults, browser) => {
    const htmlReport = await htmlReporter(jobResults, browser);
    const page = await browser.newPage();
    await page.setContent(htmlReport);
    await page.waitForSelector('main');
    const mainTag = await page.$('main') || page;
    const { width, height } = await page.evaluate((mainTag) => {
    const { width, height } = mainTag.getBoundingClientRect();
    return { width, height };
  }, mainTag);
    await mainTag.screenshot({
        path: './tmp/health-check.png',
        clip: { x: 0, y: 0, width, height },
    });
}

export default imageReporter;
