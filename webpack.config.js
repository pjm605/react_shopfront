var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: {
        app: ['babel-polyfill', './src/index.js'],
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'public' },
        ]),
        new ExtractTextPlugin('[name].css'),
    ],
    module: {
        rules: [
            // Extract css files
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
            },
            {
                test: /\.json$/,
                use: {
                    loader: 'json-loader',
                },
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
}