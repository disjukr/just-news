import $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

const toDate = (elem: JQuery) => new Date(elem.text().trim().split(/\s/).slice(-2).join(' '));

export const runAfterReconstruct = () => {
    if (!$('.article_video .jwplayer')) return;
    // @ts-ignore
    continusVideo(thisMovie);
};

export function parse(): Article {
    // reporter | created | lastModified
    const timeSection = $('#news_content_1 .wrap_time span');

    return {
        title: $('#news_content_1 .title').text(),
        content: (() => {
            const content = $('#news_content_1 .cont .body')[0].cloneNode(true);
            $('div.print_video_img', content).remove();

            // load old video's css & javascripts
            const styles = $('style').filter((_, tag) => {
                return !!$(tag).attr('data-jwplayer-id');
            }).map((_, elem) => elem.outerHTML).get().join(' ');

            const scripts = $('script').filter((_, tag) => {
                return (
                    (tag as HTMLScriptElement).src.includes('jwplayer') ||
                    tag.innerHTML.includes('jwplayer')
                );
            }).map((_, elem) => elem.outerHTML).get().join(' ');

            return styles + scripts + clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: toDate($(timeSection.get(1))),
            lastModified: timeSection.length === 3 ? toDate($(timeSection.get(2))) : undefined
        },
        reporters: [{
            name: $($('#news_content_1 .wrap_time span').get(0)).text().trim(),
            mail: undefined
        }]
    };
}
