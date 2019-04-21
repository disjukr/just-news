import * as $ from 'jquery';
import { clearStyles } from '../util';
import { Article } from '..';

export function parse(): Article {
    const title = $('#vmNewsTitle').text();

    const article = $('#container > div.w_inner > div.w_article > div.w_article_cont > div.w_article_left > div.article_cont_area')[0].cloneNode(true);
    $('.lazy', article).each(function (_, anchor) {
        anchor.classList.remove("lazy");
        anchor.setAttribute('src', anchor.getAttribute('data-original')!);
    });
    const content = clearStyles(article).innerHTML;

    const [
        ,
        created = null,
        lastModified = null,
    ] = [...$('#container > div.w_inner > div.w_article > div.w_article_title > div.info_area > .date > meta')]
        .map(element => (element instanceof HTMLElement) ? element.getAttribute('content') : null)
        .map(dateString => dateString ? new Date(dateString) : null);
    const timestamp = {
        created,
        lastModified,
    };

    const name = $('#container > div.w_inner > div.w_article > div.w_article_title > div.info_area > p > span:nth-child(1)').text();
    const mail = $('#container > div.w_inner > div.w_article > div.w_article_title > div.info_area > p > a:nth-child(5)').text();
    const reporters = (name || mail) ? [{ name, mail }] : [];

    return {
        title,
        content,
        timestamp,
        reporters,
    };
}
