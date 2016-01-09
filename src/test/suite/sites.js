import assert from 'assert';

import { checkUrl } from '../../jews';
import sites from '../../sites';

function site(site) {
    return function (url) {
        let pass = false;
        for (let pattern of sites[site]) {
            if (checkUrl(pattern, url)) pass = true;
        }
        assert(pass);
    }
}

describe('주소 패턴이 제대로 맞아 떨어지나 테스트', () => {
    it('매일경제', () => {
        let test = site('매일경제');
        test('http://nnews.mk.co.kr/newsRead.php?year=2015&no=1117117&sc=30000001'); // #210
    });

    it('스포츠서울', () => {
        let test = site('스포츠서울');
        test('http://www.sportsseoul.com/news/read/326593'); // #216
    });
});
