const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
var website;
console.log(encodeURIComponent(process.env.type))
if (process.env.type === 'test') {
    website = {
        publicPath: "http://172.31.3.25:5080/"
    }
} else if (process.env.type === 'pre') {
    website = {
        publicPath: "http://autopre.openspeech.cn/"
    }
} else if (process.env.type === 'dev') {
    website = {
        publicPath: "http://autodev.openspeech.cn/"
    }
} else {
    website = {
        publicPath: "http://localhost:1717/"
    }
}
module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
        publicPath: website.publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|jpeg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500,
                        outputPath: 'images/',
                    },

                }]
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },

            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            }
        ]
    },
    plugins: [
        new uglify(),
        new htmlPlugin({
            template: './index.html',
            minify: {
                removeAttributeQuotes: true
            },
            hash: true
        }),
        new extractTextPlugin('css/index.css')
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 1717,
        host: 'localhost',
        inline: true,
        compress: true,
    }
}