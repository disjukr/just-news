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
                <style>
                    @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css?font-display=swap');
                    body {
                        display: inline-block;
                        font-family: 'Noto Sans KR', sans-serif;
                    }
                </style>
            </head>
            <body class="markdown-body">
                ${showdownConverter.makeHtml(markdownReport)}
            </body>
        </html>
    `;
}

export default htmlReporter;
