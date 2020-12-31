/**
 * This file contains the client and server config file for development.
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const settings = require('../../settings.js');

const ROOT = path.resolve(__dirname, '../../');
const ENV_PATH = path.resolve(ROOT, '.env');

require('dotenv').config({ path: ENV_PATH });

// Babel config object
const babelOptions = {
  presets: [
    ['env', {
      targets: {
        // babel-loader is slow, only support latest browsers for dev
        browsers: ['last 1 chrome version', 'last 1 firefox version'],
        node: 'current'
      },
      useBuiltIns: true
    }],
    'react'
  ],
  plugins: [
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-object-rest-spread',
    'babel-plugin-styled-components',
    'transform-es2015-template-literals'
  ]
};

const shared = {
  mode: 'development',

  // Don't need to hear about performance in development
  performance: { hints: false },
  devtool: 'inline-source-map',

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    })
  ]
};

const client = merge(common[0], shared, {
  // Allows targeting via the --config.name flag
  name: 'client',

  // Output tells webpack where the results should go
  output: {
    path: path.resolve(ROOT, 'public/bundles'),
    publicPath: '/bundles/',
    filename: `main.bundle.js`,
    chunkFilename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader',
            options: {
              logLevel: 'info',
              transpileOnly: true,
              compilerOptions: {
                target: 'es5'
              }
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      APP_HOST: JSON.stringify(process.env.APP_HOST || 'http://localhost:3000'),
      DEBUG: JSON.stringify(true),
      'window.ETHEREUM_NODE_URL': JSON.stringify(settings.ETHEREUM_NODE_URL)
    })
  ]
});

const server = merge(common[1], shared, {
  // Allows targeting via the --config.name flag
  name: 'server',

  module: {
    rules: [
      {
        test: /\.tsx?$|\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'ts-loader',
          options: {
            logLevel: 'info',
            transpileOnly: true
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      APP_HOST: JSON.stringify(process.env.APP_HOST || 'http://localhost:3000'),
      DEBUG: JSON.stringify(true)
    })
  ]
});

// SUPER HACKY
// Remove the "CleanWebpack" plugin
server.plugins = server.plugins.filter(p => !(p instanceof CleanWebpackPlugin))

module.exports = server;
