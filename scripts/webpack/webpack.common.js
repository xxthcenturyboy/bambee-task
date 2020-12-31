/**
 * This file contains base config files for both client and server that define the properties
 * shared in both development and production environments.
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const glob = require('glob');

const ROOT = path.resolve(__dirname, '../../');

const shared = {
  resolve: {
    // Allows us to leave off file extensions in imports
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],

    // resolve.modules tells webpack where to look when we import modules into a file
    modules: ['node_modules'],

    // resolve.alias allows us to import modules using these keywords
    alias: {
      client: path.join(ROOT, './src/client'),
      server: path.join(ROOT, './src/server'),
      settings: path.join(ROOT, './settings.js'),
      shared: path.join(ROOT, './src/shared'),
      scripts: path.join(ROOT, './scripts')
    },
  },

  plugins: [
    new webpack.IgnorePlugin(
      /^\.\/locale$/,
      /moment$/
    ),
    new webpack.ProvidePlugin({
      Promise: 'bluebird'
    }),
  ]
};

const client = merge(shared, {
  // Entry tells webpack where to start
  entry: path.join(ROOT, './src/client/index.ts'),

  // Output tells webpack where the results should go
  output: {
    path: path.resolve(ROOT, 'public/bundles'),
    publicPath: '/bundles/',
    filename: `main.[contenthash].js`,
    chunkFilename: '[name].[contenthash].js'
  },

  // Externals tells webpack not to bundle these dependency, they will be retreived
  // at runtime. These are imported in index.jsx.
  externals: {
  },

  resolve: {
    modules: [path.join(ROOT, './src/client')],

    alias: {
      '~': path.join(ROOT, './src/client'),
      client: path.join(ROOT, './src/client'),
      settings: path.join(ROOT, './settings.js'),
      shared: path.join(ROOT, './src/shared')
    }
  },

  // Delete the bundles directory in 'public' before building new output
  plugins: [
    new CleanWebpackPlugin(['bundles'], {
      root: `${ROOT}/public`,
      verbose: true
    })
  ]
});

const server = merge(shared, {
  // The server config also builds the workers
  entry: {
    server: path.join(ROOT, './src/server/index.js')
    // workers: path.join(ROOT, './scripts/workers/index.js'),
    // tests: glob.sync(path.join(ROOT, './src/server/**/*.test.ts')).concat(
    //   glob.sync(path.join(ROOT, './src/shared/**/*.test.ts'))
    // )
  },

  output: {
    path: path.resolve(ROOT, 'dist'),
    filename: '[name].js',
  },

  // Target tells webpack that we intend to run this code in a Node.js environment
  target: 'node',

  // nodeExternals function tells webpack not to bundle dependencies from node_modules
  externals: [nodeExternals()],

  // These options tell webpack whether to polyfill or mock certain Node.js globals and modules
  node: {
    __dirname: false,
    __filename: false,
    fs: 'empty'
  },

  resolve: {
    modules: [path.join(ROOT, './src/server')],

    alias: {
      '~': path.join(ROOT, './src/server'),
      server: path.join(ROOT, './src/server')
    }
  },

  // Clean the Dist directory
  // plugins: [
  //   new CleanWebpackPlugin(['**/*'], {
  //     root: `${ROOT}/dist`,
  //     verbose: true
  //   })
  // ]
});

module.exports = [client, server];
