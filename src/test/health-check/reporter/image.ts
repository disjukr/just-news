import { Reporter } from '.';
import htmlReporter from './html';

const imageReporter: Reporter<void> = async (jobResults, browser) => {
    const htmlReport = await htmlReporter(jobResults, browser);
    const page = await browser.newPage();
    await page.setContent(htmlReport);
    const rect = await page.evaluate(() => {
        const element = document.querySelector('.markdown-body');
        if (!element)
            throw new Error("Markdown body is not found!")
        const {left, top, width, height} = element.getBoundingClientRect();
        return {left, top, width, height, id: element.id};
    });
    await page.screenshot({
        path: './tmp/health-check.png',
        clip: {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
        }
    });
}

export default imageReporter;
