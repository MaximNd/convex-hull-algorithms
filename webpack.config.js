const { join } = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: join(__dirname, "src/index"),

    output: {
        path: join(__dirname, "dist"),
        filename: "bundle.js",

        devtoolModuleFilenameTemplate: "[absolute-resource-path]"
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.ts$/,
                loaders: ["ts-loader"]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
};
