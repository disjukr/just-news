import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from 'index';

export function parse(): Promise<Article> {
    return new Promise(resolve => {
        let jews: Article = {};
        let category = $('.article-title .category').text();
        if (category === '뉴스 타임라인') {
            // Don't call done() to show unmodified web page.
            return;
        }
        jews.title = $('.article-header h1').text();
        jews.subtitle = $('.article-title p').text() || undefined;
        jews.content = (function () {
            var content = document.createElement('div');
            $('.article-body p.article-text, .article-body .news_photo').each(function (i, v) {
                content.appendChild(v);
            });
            return clearStyles(content).innerHTML;
        })();
        jews.timestamp = { created: undefined, lastModified: undefined };
        const ai = $('.article-info');
        ai.find('.meta-text').each((_, v) => {
            const a = v.textContent!.match(/^\s*(발행|수정)\s*(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})\s*$/);
            jews.timestamp = {};
            if (a !== null) {
                if (a[1] === '발행') jews.timestamp.created = new Date(a[2] + 'T' + a[3] + '+09:00'); // ISO 8601
                else if (a[1] === '수정') jews.timestamp.lastModified = new Date(a[2] + 'T' + a[3] + '+09:00'); // ISO 8601
            }
        });
        jews.reporters = function() {
            let reporters = undefined, email = undefined, aiw = ai.find('.writer'), abm = $('.article-bottom-meta');
            if (abm.find('.writer').length > 0) reporters = abm.find('.writer')[0].textContent!.trim();
            else if (aiw.length > 0) reporters = aiw[0].textContent!.trim();
            const reporter_email = reporters!.split("\n");
            if (reporter_email.length === 2) {
                reporters = reporter_email[0];
                email = reporter_email[1];
            }
            return [{
                name: reporters, mail: email
            }];
        }();
        // Explicitly call done() although this is not asynchronous.
        resolve(jews);
    });
}
