import { escapeRegExp } from 'lodash';
import sites from './sites';
import {
    reconstruct,
    reconstructable,
} from './reconstruct';

export function checkUrl(pattern: string): boolean {
    const { href } = window.location;

    return (new RegExp(
        escapeRegExp(pattern).replace(/\\\*/g, '.*')
    )).test(href);
}

export function where(): string | void {
    for (const site in sites) {
        for (const pattern of sites[site]) {
            if (checkUrl(pattern)) {
                return site;
            }
        }
    }

    throw new Error('이 사이트는 지원되지 않습니다.');
}

export function waitWhilePageIsLoading(): Promise<{}> {
    return new Promise(resolve => {
        switch (document.readyState) {
        case 'interactive':
        case 'complete':
            resolve();
            break;
        default:
            window.addEventListener('DOMContentLoaded', resolve);
            break;
        }
    });
}

main: {
    if (!reconstructable()) {
        break main;
    }

    waitWhilePageIsLoading()
    .then(() => require('./impl/' + where()).default())
    .then(article => reconstruct(article))
    .catch(err => console.log(err && (err.stack || err)));
}
