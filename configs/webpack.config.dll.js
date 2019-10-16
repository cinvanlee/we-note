const path = require("path");
const webpack = require("webpack");
const package = require("../package.json");

const blackList = ["electron-is-dev"];
const vendor = Object.keys(package.dependencies).filter(
    item => !blackList.includes(item)
);

module.exports = {
    mode: "development",

    entry: {
        vendor: vendor
    },

    output: {
        path: path.join(__dirname, "../dll"),
        filename: "[name].dll.js",
        library: "[name]_library"
    },

    plugins: [
        new webpack.DllPlugin({
            name: "[name]_library",
            path: path.join(__dirname, "../dll", "[name]-manifest.json")
        })
    ]
};
