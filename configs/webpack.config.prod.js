const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
    mode: "production",

    devtool: false,

    output: {
        path: path.join(__dirname, "../build"),
        filename: "[name].[chunkhash:8].js"
    },

    externals: {},

    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "../public"),
                to: path.resolve(__dirname, "../build"),
                ignore: [".*"]
            }
        ]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],

    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: true,
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});
