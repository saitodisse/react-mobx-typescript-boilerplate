const webpack = require("webpack");
const combineLoaders = require("webpack-combine-loaders");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const DEV_MODE = process.env.NODE_ENV !== "production";

module.exports = {
    entry: [
        './src/index.tsx'
    ],
    devtool: DEV_MODE ? 'inline-source-map' : 'eval-cheap-module-source-map',
    module: {
        rules: [
            { enforce: 'pre', test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.tsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: combineLoaders([
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        query: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        }
                    },
                    {
                        loader: "sass-loader",
                        query: {
                            includePaths: [
                                "./src"
                            ]
                        }
                    }
                ])
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff)(\?v=[0-9].[0-9].[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'json']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 9000,
        historyApiFallback: true,
        hot: true,
    },
    plugins: [
        ...(!DEV_MODE ? [new UglifyJsPlugin()] : []),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        }),
        new CopyWebpackPlugin([
            { from: "src/index.html" }
        ]),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: "React Boilerplate",
            filename: "index.html",
        }),
        new ImageminPlugin({
            disable: DEV_MODE,
            pngquant: {
                quality: "95-100"
            },
            test: /\.(jpe?g|png|gif|svg)$/i
        }),
        new FaviconsWebpackPlugin({
            logo: "./src/assets/favicon/favicon.png",
            inject: true,
        })
    ]
};