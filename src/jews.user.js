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
        RegExp.escape(pattern).replace(/\\\*/g, '.*')
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
    return require('./impl/' + where)();
};


if (require.main === module) {
    (async function () {
        // 다음과 같은 비교구문은 production 빌드에서 자동으로 제거됩니다.
        if (process.env.JEWS === 'test') {
            var ipc = eval(`require('electron')`).ipcRenderer;
        }
        if (!jewsable()) {
            if (process.env.JEWS === 'test') {
                ipc.sendSync('jews-error', 'not jewsable');
            }
            return;
        }
        let jewsResult;
        try {
            await waitWhilePageIsLoading();
            jewsResult = await jews();
            reconstruct(jewsResult);
        } catch (e) {
            let err = e ? (e.stack || e) : e;
            console.error(err);
            if (process.env.JEWS === 'test') {
                ipc.sendSync('jews-error', err + '');
            }
            return;
        }
        if (process.env.JEWS === 'test') {
            // ipc를 통할 때는 Date 등의 객체가 제대로 전달되지 않으므로
            // builtin type으로 변환해야합니다. 예) Date -> string
            ipc.sendSync('jews-done', (new Jews(jewsResult)).toJSON());
        }
    })();
}
