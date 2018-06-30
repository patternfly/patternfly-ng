/**
 * Adapted from angular2-webpack-starter
 */
const path = require('path'),
  helpers = require('./helpers'),
  webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Webpack Plugins
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

// MiniCssExtractPlugin
const extractCSS = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: "[id].css"
});

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  entry: helpers.root('index.ts'),

  // require those dependencies but don't bundle them
  externals: [/^@angular\//, /^rxjs\//],

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: 'tslint-loader',
        exclude: [helpers.root('node_modules')]
      },
      {
        test: /\.ts$/,
        use: [
          // 'awesome-typescript-loader',
          'ts-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.spec\.ts$/]
      },

      /*
       * to string and css loader support for *.css files
       * Returns file content as string
       *
       */
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: true
            }
          }]
      },

      /**
       * File loader for supporting fonts, for example, in CSS files.
       */
      {
        test: /\.(woff2|woff|ttf|eot|svg)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 3000,
            // includePaths: [
            //   path.resolve(__dirname, "../node_modules/patternfly/dist/fonts/")
            // ],
            name: 'assets/fonts/[name].[ext]'
          }
        },
        exclude: path.resolve(__dirname, "../src/demo/images/")
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 3000,
            includePaths: [
              path.resolve(__dirname, "../src/assets/images/")
            ],
            name: 'assets/images/[name].[ext]'
          }
        },
        exclude: path.resolve(__dirname, "../node_modules/patternfly/dist/fonts/")
      },

      // Support for *.json files.
      {
        test: /\.json$/,
        use: ['json-loader']
      },

      // todo: change the loader to something that adds a hash to images
      {
        test: /\.html$/,
        use: ['raw-loader']
      }
    ]
  },
/*
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "styles",
          chunks: "all"
        }
      }
    }
  },
*/
  plugins: [
    extractCSS,

    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src')
    ),

    /**
     * Webpack plugin to optimize a JavaScript file for faster initial load
     * by wrapping eagerly-invoked functions.
     *
     * See: https://github.com/vigneshshanmugam/optimize-js-plugin
     */

    new OptimizeJsPlugin({
      sourceMap: false
    }),

    new HtmlWebpackPlugin(),

    /**
     * Plugin: ExtractTextPlugin
     * Description: Extracts imported CSS files into external stylesheet
     *
     * See: https://github.com/webpack/extract-text-webpack-plugin
     */
    new ExtractTextPlugin('[name].css'),

    new webpack.LoaderOptionsPlugin({
      options: {
        /**
         * Html loader advanced options
         *
         * See: https://github.com/webpack/html-loader#advanced-options
         */
        tslintLoader: {
          emitErrors: false,
          failOnHint: false
        },
      }
    }),
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode
    // new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: { keep_fnames: true }}),

    // Reference: https://github.com/johnagan/clean-webpack-plugin
    // Removes the bundle folder before the build
    new CleanWebpackPlugin(['bundles'], {
      root: helpers.root(),
      verbose: false,
      dry: false
    })
  ]
};
