import { clearStyles } from '../util';

export default function () {
    let jews = {};
    var news_article = document.createElement('div');
    news_article.innerHTML = document.getElementById('articles_detail').innerHTML.split('<!-- news1_bottom_468*60 -->')[0].trim();
    [].slice.call(news_article.getElementsByTagName('iframe')).forEach(function (v) {v.remove()});

    var news_info = document.querySelector('.info').textContent.trim().split('|');
    jews.title = document.querySelector('h2').textContent.trim();
    jews.subtitle = document.querySelector('.title').textContent.trim().split('\n')[1].trim();
    jews.content = (function () {
        return clearStyles(news_article).innerHTML;
    })();
    jews.timestamp = (function() {
        var time_info = news_info[1].trim();
        return {
            created: new Date(time_info.replace(/\./g,'/').replace(/[^0-9\/\:\s]/g, '').trim()),
            lastModified: undefined
        };
    })();
    jews.reporters = (function(){
        var reporters = news_info[0].trim().replace(/\(.+\)/, '').trim();
        var matches = clearStyles(news_article).innerHTML.match(/[a-z0-9_]+@/);
        return [{
            name: reporters.split(','),
            mail: matches[0] ? matches[0] : undefined
        }];
    })();
    return jews;
}
