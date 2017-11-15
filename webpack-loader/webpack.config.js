const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'test.js',
        library: 'wool-loader'
    },
    module: {
        rules: [{
            test: /\.wool$/,
            use: 'wool-loader'
        }]
    },
    plugins: []
}