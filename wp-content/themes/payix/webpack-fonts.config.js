const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const themeOpts = require('./webpack/theme.config.json');

const getPluginProcess = (env) => {
  const isProduction = env.production === true;
  const isDevelopment = env.production !== true;
  let pluginList = [
    new BrowserSyncPlugin({
      https: true,
      host: 'localhost',
      port: 3000,
      proxy: themeOpts.proxy,
      files: [
        {
          match: [
            '**/*.twig'
          ],
          fn: function (event, file) {
            if (event === "change") {
              const bs = require('browser-sync').get('bs-webpack-plugin');
              bs.reload();
            }
          }
        }
      ]
    }),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ];

  return pluginList;
}

module.exports = (env = {}) => {
  const isProduction = env.production === true;
  const isDevelopment = env.production !== true;
  let config = {
    entry: {
      fonts: "./assets/styles/fonts.scss"
    },
    output: {
      path: __dirname + "/dist/",
      filename: 'scripts/[name].js',
      publicPath: '../'
    },
    externals: {
      jquery: 'jQuery'
    },
    devtool: isProduction ? "" : "inline-source-map",
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          include: path.resolve(__dirname, 'assets'),
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isDevelopment }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevelopment
              }
            }, {
              loader: "postcss-loader", options: {
                sourceMap: isDevelopment,
                config: {
                  path: 'webpack/'
                }
              }
            }, {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  sourceMap: isDevelopment,
                  minimize: isProduction
                }
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: isProduction ? "[name]-[hash].[ext]" : "[name].[ext]",
              outputPath: 'fonts/'
            }
          }]
        },
      ]
    },
    plugins: getPluginProcess(env, this.entry),
    mode: isProduction ? "production" : "development"
  }
  return config;
}
