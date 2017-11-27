const helpers = require('./helpers');
const webpack = require('webpack');
const path = require('path');

/**
 * Webpack Plugins
 */
const AotPlugin = require('@ngtools/webpack').AotPlugin; // Angular 4
// const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin; // Angular 5
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

// ExtractTextPlugin
const extractCSS = new ExtractTextPlugin({
  filename: '[name].[id].css',
  allChunks: true
});

module.exports = {
  devServer: {
    stats: 'minimal',
    inline: true
  },

  devtool: 'cheap-module-eval-source-map',

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/demo.ts'
  },

  resolve: {
    extensions: ['.webpack.js', '.wep.js', '.js', '.ts']
  },

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        test: /\.css$/,
        loader: extractCSS.extract({
          fallback: "style-loader",
          use: "css-loader?sourceMap&context=/"
        })
      }, {
        test: /\.less$/,
        loaders: [
          {
            loader: 'css-to-string-loader'
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              context: '/'
            }
          }, {
            loader: 'less-loader',
            options: {
              paths: ['./node_modules/patternfly/node_modules'],
              sourceMap: true
            }
          }
        ]
      },

      /* File loader for supporting fonts, for example, in CSS files.
       */
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loaders: [
          {
            loader: "url-loader",
            query: {
              limit: 3000,
              name: 'assets/fonts/[name].[ext]'
            }
          }
        ]
      }, {
        test: /\.jpg$|\.png$|\.gif$|\.jpeg$/,
        loaders: [
          {
            loader: "url-loader",
            query: {
              limit: 3000,
              name: 'assets/fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  output: {
    path: helpers.root('dist-demo'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },

  plugins: [
    extractCSS,
    /*
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      template: 'src/demo.html'
    }),

    /**
     * Plugin: NamedModulesPlugin (experimental)
     * Description: Uses file names as module name.
     *
     * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
     */
    new NamedModulesPlugin(),

    // Todo: config is not loading.
    //new TsConfigPathsPlugin({
    //  configFileName: helpers.root("tsconfig-demo.json")
    //}),

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
      helpers.root('src') // location of your src
    ),

    new TypedocWebpackPlugin({
      name: 'PatternFly NG',
      mode: 'file',
      includeDeclarations: false,
      ignoreCompilerErrors: true,
      excludePrivate: true,
      exclude: '**/+(examples|demo)/**'
    }, './src'),

    /**
     * Plugin: AotPlugin
     * Description: Angular Ahead-of-Time Webpack Plugin
     *
     * See: https://www.npmjs.com/package/@ngtools/webpack
     */
    new AotPlugin({
      entryModule: helpers.root('src/demo/app.module.ts#AppModule'),
      tsConfigPath: helpers.root('tsconfig-aot.json')
    }),

    /**
     * Plugin: copy-webpack-plugin
     * Description: Copies individual files or entire directories to the build directory
     *
     * See: https://github.com/kevlened/copy-webpack-plugin
     */
    new CopyWebpackPlugin([{
      from: helpers.root('README.md')
    }]),
  ]
};
