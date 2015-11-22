import path from 'path';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';

export default function get() {
    return {
        entry: {},
        devtool: 'source-map',
        output: {},
        resolve: {
            extensions: ['', '.js', '.min.js'],
            modulesDirectories: ['src', 'node_modules']
        },
        node: {
            filename: true,
            global: true
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: [ path.resolve(__dirname, '../src') ],
                    loader: 'babel'
                }
            ]
        },
        plugins: [
            new ProgressPlugin((percentage, msg) => {
                if(percentage < 1) {
                    percentage = Math.floor(percentage * 100);
                    msg = percentage + '% ' + msg;
                    if(percentage < 100) {
                        msg = ' ' + msg;
                    }
                    if(percentage < 10) {
                        msg = ' ' + msg;
                    }
                }
                goToLineStart(msg);
                process.stderr.write(msg);
            })
        ]
    };
};

let chars = 0;
function goToLineStart(nextMessage) {
    let str = '';
    for (; chars > nextMessage.length; --chars) {
        str += '\b \b';
    }
    chars = nextMessage.length;
    for (let i = 0; i < chars; ++i) {
        str += '\b';
    }
    if (str) process.stderr.write(str);
}
