const { join } = require("path");

module.exports = {
    entry: join(__dirname, "src/index"),

    output: {
        path: join(__dirname, "dist"),
        filename: "bundle.js",

        devtoolModuleFilenameTemplate: "[absolute-resource-path]"
    },

    resolve: {
        extensions: [".ts"]
    },

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ["ts-loader"]
            }
        ]
    }
};
