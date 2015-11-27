export function asyncRunCompiler(compiler) {
    return new Promise(resolve => {
        compiler.purgeInputFileSystem();
        compiler.run((err, stats) => {
            if (err) {
                console.error(err.stack || err);
                if (err.details) console.error(err.details);
                process.exit(1);
            }
            resolve(stats);
        });
    });
};

export getBaseConfig from './base-config';
