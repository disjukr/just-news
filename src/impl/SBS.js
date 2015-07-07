import $ from 'jquery';
import { clearStyles } from '../util';

export default function () {
    let jews = {};
    jews.title = $('#container .smdend_content_w .sep_cont_w .sed_articel_head .seda_title').text();
    jews.subtitle = $('#container .smdend_content_w .sep_cont_w .sed_article_w .sed_sub_title').text();
    jews.content = (function () {
        var content = $('#container .smdend_content_w .sep_cont_w .sed_article_w .sed_article')[0].cloneNode(true);
        $('.lazy', content).each(function(_, anchor){
            anchor.classList.remove("lazy");
            anchor.attributes['src'].value = anchor.attributes['data-original'].value;
        });
        return clearStyles(content).innerHTML;
    })();
    jews.timestamp = (function () {
        var parsedData = $('#container .smdend_content_w .sep_cont_w .sed_atcinfo_sec_w .sed_write_time').contents();
        return {
          created: new Date(parsedData.eq(0).text().replace(/\./g, '/')),
          lastModified: new Date(parsedData.eq(2).text().replace(/\./g, '/'))
        };
    })();
    jews.reporters = (function () {
        var parsedData = $('#container .smdend_content_w .sep_cont_w .sed_atcinfo_sec_w .seda_author').children();
        var name = parsedData.eq(0).text() || undefined;
        var mail;
        if (parsedData.length > 1) {
            mail = /(?:mailto:)?(.*)/.exec(parsedData.eq(1).attr('href'))[1];
        }
        if (name || mail) {
            return [{
                name: name,
                mail: mail
            }];
        } else {
            return [];
        }
    })();
    return jews;
}