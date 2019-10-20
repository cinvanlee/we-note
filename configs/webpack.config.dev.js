const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
    mode: "development",

    output: {
        path: path.join(__dirname, "../build"),
        filename: "[name].js"
    },

    devtool: "inline-source-map",

    devServer: {
        host: "0.0.0.0",
        port: "1024"
    },

    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require(path.join(
                __dirname,
                "../dll",
                "vendor-manifest.json"
            ))
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve("../dll/vendor.dll.js"),
            includeSourcemap: false
        })
    ]
});
