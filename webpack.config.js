'use strict';

module.exports = {
    mode: 'production',
    entry: './dist/index.js',
    output: {
        filename: 'WrkzCoinUtils.js',
        library: 'WrkzCoinUtils',
        libraryTarget: 'umd'
    },
    node: {
        fs: 'empty'
    },
    target: 'web'
};
