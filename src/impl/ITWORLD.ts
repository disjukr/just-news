import {
    Article,
} from '..';

export function parse(): Promise<Article> {
    return new Promise(resolve => {
        const created = (() => {
            const timeString = document.getElementsByClassName('news_list_time')[0].textContent!.trim();
            const date = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(timeString);
            if (date) return new Date(date[1] + '-' + date[2] + '-' + date[3] + 'T00:00:00+09:00');
            let d = 1000 * 60 * 60 * 24;
            const m = (() => {
                let m;
                m = /(\d)일 전/.exec(timeString);
                if (m) { return m; }
                m = /(\d+)시간 전/.exec(timeString);
                if (m) { d /= 24; return m; }
                m = /(\d+)분 전/.exec(timeString);
                if (m) { d /= 24 * 60; return m; }
                return null;
            })();
            return m ? new Date(
                ((Date.now() / d | 0) - (m[1] as any | 0)) * d -
                (1000 * 60 * 60 * 9 /* +09:00 */)
            ) : null;
        })();
        const result: Article = {
            title: document.getElementsByClassName('node_title')[0].textContent!.trim(),
            timestamp: { created },
            reporters: [{ name: document.getElementsByClassName('node_source')[0].textContent!.trim() }],
        };
        const pagination = document.getElementsByClassName('pagination')[0];
        if (pagination) {
            function get(s: string, callback: (res: string) => void) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', s, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === (xhr.DONE || 4)) callback(xhr.responseText);
                };
                xhr.send();
            }
            function finish() {
                if (p.indexOf(0) !== -1) return;
                result.content = p.join('<br><br>');
                resolve(result);
            }
            const p = Array.from(pagination.getElementsByTagName('li')).map((v, i) => {
                if (v.className.match(/\bactive\b/)) {
                    var el = document.createElement('div');
                    el.innerHTML = document.getElementsByClassName('node_body')[0].innerHTML;
                    el.getElementsByClassName('pagination')[0].remove();
                    return el.innerHTML;
                }
                get(v.getElementsByTagName('a')[0].href, res => {
                    let a: Element = document.createElement('div');
                    a.innerHTML = res;
                    a = a.getElementsByClassName('node_body')[0];
                    a.getElementsByClassName('pagination')[0].remove();
                    p[i] = a.innerHTML;
                    finish();
                });
                return 0;
            });
        } else {
            result.content = document.getElementsByClassName('node_body')[0].innerHTML;
            resolve(result);
        }
    });
}
