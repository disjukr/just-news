import electron from 'electron';
const { app } = electron;

global.window = {};
require('mocha');

export default class JewsMocha extends window.Mocha {
    constructor(options) {
        super(options);
        let req = require.context('./suite', true);
        this.files = req.keys();
        this.__require = (path) => {
            try { req(path); } catch (e) {
                console.error(e ? (e.stack || e) : e);
                app.exit(1);
            }
        };
    }
    loadFiles(fn) {
        for (let file of this.files) {
            this.suite.emit('pre-require', global, file, this);
            this.suite.emit('require', this.__require(file), file, this);
            this.suite.emit('post-require', global, file, this);
        }
        if (fn) fn();
    }
};
