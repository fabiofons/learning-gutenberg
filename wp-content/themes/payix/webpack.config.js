const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const glob = require('glob');

const themeOpts = require('./webpack/theme.config.json');

const makeCSSEntry = () => {
  const blockFiles = glob.sync('assets/styles/blocks/*.scss', {});
  const entryFilesRegExp = /^assets\/styles\/blocks\/(.+)\.scss$/;
  const styleFiles = glob.sync('assets/styles/*.scss', {});
  const styleFilessRegExp = /^assets\/styles\/(.+)\.scss$/;

  let blocksCSS = blockFiles.reduce((acc, path) => {
    const match = path.match(entryFilesRegExp)[1];
    acc[match] = `./${path}`;
    return acc;
  }, {});

  return Object.assign(blocksCSS, styleFiles.reduce((acc, path) => {
    const match = path.match(styleFilessRegExp)[1];
    acc[match] = `./${path}`;
    return acc;
  }, {}));
};

const getPluginProcess = (env) => {
  const isProduction = env.production === true;
  const isDevelopment = env.production !== true;
  let pluginList = [
    new CleanWebpackPlugin(),
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
    new WebpackAssetsManifest({
      output: 'assets.json',
      replacer: require('./webpack/assetManifestsFormatter')
    }),
    new ImageminPlugin({
      test: '/\.(jpe?g|png|gif|svg)$/i',
      disable: isDevelopment,
    }),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: isProduction ? "styles/[name]-[hash].css" : "styles/[name].css",
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
    entry: Object.assign(makeCSSEntry(), {
      main: "./assets/scripts/main.js"
    }),
    output: {
      path: __dirname + "/dist/",
      filename: isProduction ? 'scripts/[name]-[hash].js' : 'scripts/[name].js',
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
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProduction ? "[name]-[hash].[ext]" : "[name].[ext]",
                outputPath: 'images/'
              }
            }
          ]
        },
        {
          test: /\.(svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: isProduction ? "[name]-[hash].[ext]" : "[name].[ext]",
              outputPath: 'images/',
              limit: 8192
            }
          }
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'assets'),
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [["@babel/preset-env"]]
            }
          }]
        }
      ]
    },
    plugins: getPluginProcess(env, this.entry),
    mode: isProduction ? "production" : "development"
  }
  return config;
}
