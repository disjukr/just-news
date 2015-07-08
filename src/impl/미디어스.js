import $ from 'jquery';

export default function () {
    let jews = {};
    ['Top', 'Left'].forEach(function (v) {
        Object.defineProperty(document.body, 'scroll' + v, {writable: false, value: 0});
    });
    ['By', 'To'].forEach(function (v) {
        window['scroll' + v] = function () {};
    });
    var _filter = function (a) {
        return [].filter.apply(a, [].slice.call(arguments, 1));
    };
    var el_filter = function (el, obj, m) {
        if (typeof el==="string") el = $(el)[0].childNodes;
        else if (el instanceof Node) el = el.childNodes;
        var f;
        if (m === true || m === undefined) f = function(v) { return v instanceof obj; };
        else f = function(v) { return !(v instanceof obj); };
        return _filter(el, f);
    };
    jews.title = $('.View_Title>strong').text();
    jews.subtitle = $('.View_Title>span').text();
    jews.timestamp = {
        created: new Date(el_filter('.View_Time', HTMLElement, false)[0].textContent.trim().replace(/(\d{4})\.(\d{2})\.(\d{2})\s*/, "$1-$2-$3T")+"+09:00"),
        lastModified: undefined
    };
    var info = $('.View_Info')[0].childNodes;
    jews.reporters = [{
        name: el_filter(info, HTMLElement, false)[0].textContent.split(/\s*\|\s*/)[0],
        mail: el_filter(info, HTMLAnchorElement)[0].textContent
    }];
    jews.content = document.getElementById('_article').innerHTML.trim();
    return jews;
}
