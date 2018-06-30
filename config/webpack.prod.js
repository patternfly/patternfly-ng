/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = function (env) {
  console.log('The env from the webpack.prod config: ' + JSON.stringify(env, null, 2));
  return webpackMerge(commonConfig, {

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'source-map',

    output: {
      path: helpers.root('dist'),
      publicPath: '/',
      filename: 'bundles/patternfly-ng.js',
      library: 'patternfly-ng',
      libraryTarget: 'umd',
      umdNamedDefine: true
    }
  });
};
