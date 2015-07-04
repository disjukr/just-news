import sites from './sites';
import reconstruct from './reconstruct';

(async () => {
    if (!jewsable()) return;
    await waitWhilePageIsLoading();
    reconstruct(await jews(here()));
})();

function jews(where) {
    return require('./impl/' + where)();
}
function here() {
    for (let site in sites) {
        for (let pattern of sites[site]) {
            if (checkUrl(pattern)) {
                return site;
            }
        }
    }
    throw new Error('jews don\'t support this site');
}
function jewsable() {
    return window.location.search.indexOf('jews=false') < 0;
}
function waitWhilePageIsLoading() {
    return new Promise(resolve => $(resolve));
}
function checkUrl(pattern) {
    return (new RegExp(
        RegExp.escape(pattern).replace(/\\\*/g, '.+?')
    )).test(window.location.href);
}
