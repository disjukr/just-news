import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = document.title;
    jews.subtitle = undefined;
    jews.content = (function () {
        var content = $('.pf-content')[0].cloneNode(true);
        $('.printfriendly', content).remove();
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = {
        created: new Date(document.querySelector('meta[property="article:published_time"]').content),
        lastModified: new Date(document.querySelector('meta[property="article:modified_time"]').content)
    };
    var $author = $('[itemprop="author"] a');
    jews.reporters = [{
        name: $author.text(),
        mail: $author.attr('href')
    }];
    jews.cleanup = function () {
        $('#move-to-top, #selectionSharerPopover, #selectionSharerPopunder, #fb-root').remove();
    };
    return jews;
}
