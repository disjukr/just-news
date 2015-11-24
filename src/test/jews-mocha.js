import electron from 'electron';
const { app } = electron;

global.window = {};
require('mocha');

export default class JewsMocha extends window.Mocha {
    constructor(options) {
        super(options);
        let req = require.context('./suite', true);
        this.__webpackRequire = req;
        this.files = req.keys();
    }
    loadFiles(fn) {
        try {
            for (let file of this.files) {
                this.suite.emit('pre-require', global, file, this);
                this.suite.emit('require', this.__webpackRequire(file), file, this);
                this.suite.emit('post-require', global, file, this);
            }
        } catch (e) {
            console.error(e ? (e.stack || e) : e);
            app.exit(1);
        }
        if (fn) fn();
    }
};
