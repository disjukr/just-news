import webpack from 'webpack';

const LazyStyleLoader: webpack.loader.Loader = function (source) {
    return `
        window.lazyStyles = window.lazyStyles || [];
        window.lazyStyles.push(${JSON.stringify(source.toString())});
    `;
};

export default LazyStyleLoader;
