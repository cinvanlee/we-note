const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.NODE_ENV;
const __DEV__ = env === "development";
const __PROD__ = env === "production";

module.exports = {
    target: "electron-renderer",

    entry: path.join(__dirname, "../app/index.js"),

    resolve: {
        alias: {
            "@": path.join(__dirname, "../app")
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: {
                                "primary-color": "#009688"
                            },
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(a?png|svg)$/,
                use: ["url-loader?limit=10000"]
            },
            {
                test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                use: ["file-loader"]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(env)
            },
            __DEV__,
            __PROD__
        }),
        new HtmlWebpackPlugin({
            template: "./app/index.html"
        })
    ]
};
