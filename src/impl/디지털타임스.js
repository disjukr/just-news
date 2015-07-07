import $ from 'jquery';
import { clearStyles } from '../util';

export default function (jews) {
    jews.title = $('#news_names h1').text();
    jews.subtitle = $('#news_names h3').text();
    jews.content = (function () {
        var content = $('#NewsAdContent')[0].cloneNode(true);
        $('a', content).each(function (_, anchor) {
            $(anchor).replaceWith($(anchor)[0].innerHTML);
        });
        $('[alt="DT Main"]', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = /입력: (....-..-.. ..:..)/.exec($('#news_names p').text());
        return {
            created: (parsedData === null) ? undefined : new Date(parsedData[1].replace(/-/g, '/')),
            lastModified: undefined
        };
    })();
    jews.reporters = [{
        name: $('#news_names p')[0].childNodes[0].textContent.trim(),
        mail: $('#news_names p [href^=mailto]').text()
    }];
    jews.cleanup = function () {
        $('#soeaLayerLoc_fi').remove();
    };
}