export default function () {
    return new Promise(resolve => {
        var t = document.getElementsByClassName('news_list_time')[0].textContent.trim(),
            date = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(t),
            m = /(\d)일 전/.exec(t),
            d = 1000 * 60 * 60 * 24;
        function f(m) { return new Date(((Date.now() / d | 0) - (m | 0)) * d - 1000 * 60 * 60 * 9 /* +09:00 */); }
        if (date !== null) t = new Date(date[1] + '-' + date[2] + '-' + date[3] + 'T00:00:00+09:00');
        else {
            if (m === null)
                if ((m = /(\d+)시간 전/.exec(t)) !== null) d /= 24;
                else if ((m = /(\d+)분 전/.exec(t)) !== null) d /= 24 * 60;
            if (m !== null) t = f(m[1]);
        }
        var j = {
            'title': document.getElementsByClassName('node_title')[0].textContent.trim(),
            'timestamp': {
                'created': t,
                'lastModified': undefined
            },
            'reporters': [{
                'name': document.getElementsByClassName('node_source')[0].textContent.trim(),
                'mail': undefined
            }]
        };
        var pagination = document.getElementsByClassName('pagination')[0];
        if (pagination) {
            function get(s, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', s, true);
                xhr.onreadystatechange = function () {
                    if (this.readyState === (this.DONE || 4)) callback(this);
                };
                xhr.send();
            }
            function finish(){
                if (p.indexOf(0) !== -1) return;
                j.content = p.join('<br><br>');
                resolve(j);
            }
            var p = [].slice.call(pagination.getElementsByTagName('li')).map(function (v, i) {
                if (v.className.match(/\bactive\b/)) {
                    var el = document.createElement('div');
                    el.innerHTML = document.getElementsByClassName('node_body')[0].innerHTML;
                    el.getElementsByClassName('pagination')[0].remove();
                    return el.innerHTML;
                }
                get(v.getElementsByTagName('a')[0].href, function (t) {
                    var a = document.createElement('div');
                    a.innerHTML = t.responseText;
                    a = a.getElementsByClassName('node_body')[0];
                    a.getElementsByClassName('pagination')[0].remove();
                    p[i] = a.innerHTML;
                    a = null;
                    finish();
                });
                return 0;
            });
        } else {
            j.content = document.getElementsByClassName('node_body')[0].innerHTML;
            resolve(j);
        }
    });
}
