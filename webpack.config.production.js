var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['', '.jsx', '.js', '.less']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ProvidePlugin({
            'Promise': 'exports?global.Promise!es6-promise',
            'fetch': 'exports?self.fetch!whatwg-fetch'
        }),
        new ExtractTextPlugin('app.css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['exports', 'require']
            },
            compressor: {
                screw_ie_8: true,
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'react-hot!babel',
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file',
                exclude: /node_modules/
            },
            {
                test: /\.global\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'less-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /^((?!\.global).)*\.less$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'less-loader'
                ),
                exclude: /node_modules/
            }
        ]
    },
    postcss: [
        require('autoprefixer')
    ]
}