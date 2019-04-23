import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    const content = $('.article_view > section')[0].cloneNode(true);
    const [reporterInfo, createdInfo, modifiedInfo] = $('.info_view > .txt_info');
    const parseTime = (timeInfo: Nullable<string>) => {
        if (timeInfo) {
            const iso8601 = timeInfo.replace(/((입력|수정) )(\d{4})\.(\d{2}).(\d{2}). (\d{2}:\d{2})/, '$3-$4-$5T$6');
            return new Date(iso8601);
        }
        return undefined;
    }

    return {
        title: $('.tit_view').text(),
        content: clearStyles(content).innerHTML,
        timestamp: {
            created: createdInfo && parseTime(createdInfo.innerText),
            lastModified: modifiedInfo && parseTime(modifiedInfo.innerText),
        },
        reporters: [{
            name: reporterInfo && reporterInfo.innerText.split(' ')[0],
            // TODO: 컨텐츠 섹션 최하단에 리포터 정보 더 있는데 양식이 정해져 있지 않음.
        }],
    };
}
