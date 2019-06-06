import { clearStyles } from '../util';
import { Article } from '..';

export const cleanup = () => {
    document.querySelectorAll('#tooltipLayer_english, .u_cbox_layer_wrap').forEach((v) => {
        v.remove();
    });
}

export function parse(): Article {
    const parseTime = (timeInfo: Nullable<string>) => {
        if (timeInfo) {
            const iso8601 = timeInfo.replace(/(\d{4}).(\d{2}).(\d{2}). (오전|오후) (\d{1,2}):(\d{2})/, function(_, year, month, day, ampm, hour, minuate) {
                hour |= 0;
                if (ampm === "오후") hour += 12;
                if (hour === 24) hour = 0;
                hour = hour < 10 ? "0" + hour : hour;
                return `${year}-${month}-${day}T${hour}:${minuate}+09:00`;
            })
            return new Date(iso8601);
        }
        return undefined;
    }
    return {
        title: $('#articleTitle').text(),
        content: (() => {
            const content = document.querySelector('#articleBodyContents')!;
            const iframes = content.querySelectorAll('.vod_area iframe[_src]');
            if (iframes.length > 0) {
                iframes.forEach((v) => {
                    v.setAttribute('src', v.getAttribute('_src')!);
                });
            }
            return clearStyles(content).innerHTML;
        })(),
        timestamp: {
            created: (() => {
                let created = $('.article_info .sponsor .t11').eq(0).text();
                return parseTime(created);
            })(),
            lastModified: (() => {
                let modified = $('.article_info .sponsor .t11').eq(1).text();
                return parseTime(modified);
            })(),
        },
    };
}
