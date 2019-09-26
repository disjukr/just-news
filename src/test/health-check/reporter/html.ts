import showdown from 'showdown';

import { Reporter } from '.';
import markdownReporter from './markdown';

const htmlReporter: Reporter<string> = async (jobResults, browser) => {
    const markdownReport = await markdownReporter(jobResults, browser);
    const showdownConverter = new showdown.Converter({tables: true});
    return `
        <!DOCTYPE html>
        <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <link
                    href="https://unpkg.com/primer/build/build.css"
                    rel="stylesheet">
                <link
                    href="https://fonts.googleapis.com/earlyaccess/notosanskr.css?font-display=swap"
                    rel="stylesheet">
                <style>
                    .markdown-body, tt, code, .input-monospace, .text-mono, .h00-mktg,.h0-mktg,.h1-mktg,.h2-mktg,.h3-mktg,.h4-mktg,.h5-mktg,.h6-mktg,.lead-mktg, .pullquote {
                        font-family: 'Noto Sans KR', sans-serif !important;
                    }
                </style>
            </head>
            <body>
                <main class="markdown-body">
                    ${showdownConverter.makeHtml(markdownReport)}
                </main>
            </body>
        </html>
    `;
}

export default htmlReporter;
