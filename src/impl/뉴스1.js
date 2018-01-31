import * as $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    var headline = $('div.title');
    var content = $('#articles_detail')[0].cloneNode(true);

    jews.title = $('h2', headline).text();
    jews.subtitle = $('h3', headline).text().replace(/\n/g, '<br>');
    jews.content = (function () {
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function() {
        return {
            created: new Date($('div.info', headline).text().split('|')[1].replace(' 송고', '').replace(/\./g, '/').replace(' ', 'T').replace(/\s+/g, '')+'+0900'),
            lastModified: undefined
        };
    })();
    jews.reporters = (function(){
        var reporters = $('div.info', headline).text().split('|')[0].replace(/\(.+?\)/, '').split(', ');
        var result = [];
        for (var x in reporters) {
            result.push({
                name: reporters[x],
                mail: undefined
            });
        }
        return result;
    })();
    return jews;
}
