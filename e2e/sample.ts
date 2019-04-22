import { Page } from "puppeteer";

jest.setTimeout(10 * 1000)

interface MatcherOptions {
    check: string[]
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeJustNews(options: MatcherOptions): R;
    }
  }
}

expect.extend({
    async toBeJustNews(page: Page, options: MatcherOptions) {
        await page.addScriptTag({
            path: 'dist/just-news.user.js',
        });

        // TODO: implement
        // options.check.map(async (className) => {
        //     await page.waitForSelector(`.just-news > .${className}`)
        // })

        return {
            message: '',
            pass: false,
        };
    },
});

describe('경향신문', () => {
    test('#58', async () => {
        await page.goto('http://biz.khan.co.kr/khan_art_view.html?artid=201410311921301&code=920100&med=khan')
        expect(page).toBeJustNews({
            check: ['title', 'subtitle', 'content', 'timestamp.created', 'timestamp.lastModified', 'reporters.0.name', 'reporters.0.mail'],
        });
    });
});
