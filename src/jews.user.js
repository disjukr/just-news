import 'regenerator-runtime/runtime';
import escapeRegExp from 'lodash.escaperegexp';

import sites from './sites';
import reconstruct from './reconstruct';


// for type coercing
export class Jews {
    constructor(obj={}) {
        this._timestamp = {
            _created: undefined,
            _lastModified: undefined,
            get created() {
                if (this._created instanceof Date)
                    return new Date(this._created);
                return this._created;
            },
            set created(v) {
                if (typeof v === 'number' || v instanceof Number ||
                    typeof v === 'string' || v instanceof String) {
                    this._created = new Date(v);
                } else if (v === undefined || v instanceof Date) {
                    this._created = v;
                } else {
                    throw new Error('잘못된 작성일');
                }
            },
            get lastModified() {
                if (this._lastModified instanceof Date)
                    return new Date(this._lastModified);
                return this._lastModified;
            },
            set lastModified(v) {
                if (typeof v === 'number' || v instanceof Number ||
                    typeof v === 'string' || v instanceof String) {
                    this._lastModified = new Date(v);
                } else if (v === undefined || v instanceof Date) {
                    this._lastModified = v;
                } else {
                    throw new Error('잘못된 마지막 수정일');
                }
            },
            toJSON() {
                return {
                    created: this.created + '',
                    lastModified: this.lastModified + '',
                };
            }
        };
        this.title = obj.title;
        this.subtitle = obj.subtitle;
        this.content = obj.content;
        this.timestamp = obj.timestamp;
        this.reporters = obj.reporters;
    }
    get title() { return this._title; }
    set title(v) { this._title = v ? v + '' : ''; }
    get subtitle() { return this._subtitle; }
    set subtitle(v) { this._subtitle = v ? v + '' : ''; }
    get content() { return this._content; }
    set content(v) { this._content = v ? v + '' : ''; }
    get timestamp() { return this._timestamp; }
    set timestamp(v) {
        if (typeof v === 'object') {
            this._timestamp.created = v.created;
            this._timestamp.lastModified = v.lastModified;
        }
    }
    get reporters() {
        return this._reporters.map(reporter => Object.assign({}, reporter));
    }
    set reporters(v) {
        if (Array.isArray(v)) {
            this._reporters = v.map(reporter => Object.assign({}, reporter));
        } else {
            this._reporters = [];
        }
    }
    toJSON() { // for ipc
        return {
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            timestamp: this.timestamp.toJSON(),
            reporters: this.reporters
        };
    }
};

export function waitWhilePageIsLoading() {
    return new Promise(resolve => {
        switch (document.readyState) {
        case 'interactive': case 'complete': { resolve(); break; }
        default: {
            window.addEventListener('DOMContentLoaded', resolve);
        } break;
        }
    });
};

export function checkUrl(pattern, url=window.location.href) {
    return (new RegExp(
        escapeRegExp(pattern).replace(/\\\*/g, '.*')
    )).test(url);
};

export function here() {
    for (let site in sites) {
        for (let pattern of sites[site]) {
            if (checkUrl(pattern)) {
                return site;
            }
        }
    }
    throw new Error('jews don\'t support this site');
};

export function jewsable() {
    return window.location.search.indexOf('jews=false') < 0;
};

export default function jews(where=here()) {
    return require('./impl/' + where).default();
};


(async function () {
    try {
        await waitWhilePageIsLoading();
        reconstruct(await jews());
    } catch (e) {
        let err = e ? (e.stack || e) : e;
        console.error(err);
    }
})();
