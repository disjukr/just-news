import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#articletitle .title h3').text();
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('#article_content')[0].cloneNode(true);
        $('#spnAddLinkArticleContent, .ad_article_bottom1text', content).remove();
        var trimIndex = -1;
        $(content).contents().each(function (i, v) {
            if (v.nodeType === 3 && v.textContent.trim() === '[OSEN 주요뉴스]') {
                trimIndex = i;
            }
            if (trimIndex !== -1) {
                $(v).remove();
            }
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('.artical_date').contents();
        var lastModified;
        if (parsedData.length > 1) {
            lastModified = new Date(parsedData.eq(1).text().replace('수정 ', '').replace(/\./g, '/'));
        }
        return {
            created: new Date(parsedData.eq(0).text().replace('입력 ', '').replace(/\./g, '/')),
            lastModified: lastModified
        };
    })();
    jews.reporters = [];
    jews.cleanup = function () {
        $('#gnb_banner, .article_ad250, iframe, div#fb-root').remove();
    };
    return jews;
}
