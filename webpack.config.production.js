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
        extensions: ['', '.jsx', '.js', '.less', '.jpg', '.jpeg', '.png']
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
                test: /(\.less|\.css)$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less'),
                exclude: /node_modules/
            }
        ]
    },
    postcss: [
        require('autoprefixer')
    ]
}