const path = require('path');

module.exports = {
    mode: "development",
    entry: ["./src/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",

    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    "absoluteRuntime": false,
                    "corejs": false,
                    "helpers": true,
                    "regenerator": true,
                    "useESModules": false,
                    "version": "7.0.0-beta.0"
                  }
                ]
              ]
            }
          }
        }
      ]
    },
    devtool: "eval-source-map"
}