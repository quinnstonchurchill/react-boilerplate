var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['', '.jsx', '.js', '.less', '.jpg', '.jpeg', '.png']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.ProvidePlugin({
            'Promise': 'exports?global.Promise!es6-promise',
            'fetch': 'exports?self.fetch!whatwg-fetch'
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
                test: /\.(jpg|jpeg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file',
                exclude: /node_modules/,
                query: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /(\.less|\.css)$/,
                loader: 'style!css!less',
                exclude: /node_modules/
            }
        ]
    }
}